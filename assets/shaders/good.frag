#version 450

#define PI 3.1415926535897932384626433832795

layout(location = 0) out vec4 color;

// interpolated position and direction of ray in world space
layout(location = 0) in vec3 p;
layout(location = 1) in vec3 d;

//push constants block
layout( push_constant ) uniform constants
{
	mat4 model; // currently unused
	mat4 invView; // camera-to-world
	vec4 proj; // (near, far, aspect, fov)

} pushConstants;

layout(set = 0, binding = 0) uniform sampler2D texSampler;
layout(set = 0, binding = 1) uniform sampler2D texSamplerSun;
layout(set = 0, binding = 2) uniform sampler2D texSamplerEarth;
layout(set = 0, binding = 3) uniform sampler2D texSamplerMoon;
layout(set = 0, binding = 4) uniform sampler2D texSamplerSkybox;

layout(set = 0, binding = 5) uniform aoModeBuf {
    float time1;
};

// Material properties
vec3 bg_color = vec3(0.00,0.10,0.05);

// Sphere intersection function
float intersectSphere(vec3 rayOrigin, vec3 rayDirection, vec3 sphereCenter, float sphereRadius) {
    vec3 sphereToRay = rayOrigin - sphereCenter;
    float a = dot(rayDirection, rayDirection);
    float b = 2.0 * dot(sphereToRay, rayDirection);
    float c = dot(sphereToRay, sphereToRay) - sphereRadius * sphereRadius;
    float discriminant = b * b - 4.0 * a * c;

    if (discriminant < 0.0) {
        // No intersection
        return -1.0;
    } else {
        // Compute intersection points
        float t1 = (-b - sqrt(discriminant)) / (2.0 * a);
        float t2 = (-b + sqrt(discriminant)) / (2.0 * a);

        // Return the closest intersection point
        return min(t1, t2);
    }
}

float sunRotationPeriod = 25.0;    // in seconds

float earthRotationPeriod = 1.0;   // in seconds
float earthOrbitalPeriod = 365.25; // in days

float moonRotationPeriod = 27.3;   // in days
float moonOrbitalPeriod = 27.3;   // in days

mat3 createRotationYMatrix(float angle) {
    float c = cos(angle);
    float s = sin(angle);

    return mat3(
        vec3(c, 0.0, -s),
        vec3(0.0, 1.0, 0.0),
        vec3(s, 0.0, c)
    );
}

mat4 createTranslationMatrix(vec3 translation) {
    return mat4(
        vec4(1.0, 0.0, 0.0, 0.0),
        vec4(0.0, 1.0, 0.0, 0.0),
        vec4(0.0, 0.0, 1.0, 0.0),
        vec4(translation, 1.0)
    );
}

struct Light {
    vec3 position;
    vec3 light;
};

vec3 sunCenter = vec3(0.0, 0.0, 0.0);
vec3 earthCenter = vec3(0.0, 0.0, -2.0); // Scale down the distance
vec3 moonCenter = vec3(1.0, 0.0, -2.5); // Scale down the distance
float sunRadius = 0.5;
float earthRadius = 0.5 * 0.5; // Scale down by half
float moonRadius = 0.5 * 0.2; // Scale down by half

bool inShadow(vec3 point, vec3 lightDir) {
    // Cast a ray towards the sun
    float earthIntersection = intersectSphere(point, lightDir, earthCenter, earthRadius);

    // Cast a ray towards the moon
    float moonIntersection = intersectSphere(point, lightDir, moonCenter, moonRadius);

    // If there is any intersection with the sun, consider it in shadow
    return moonIntersection > 0.0 && earthIntersection < 1.0;
}

void main() {
    // Definition
    float earthOrbitalAngle = mod(time1 / earthOrbitalPeriod, 1.0) * 2.0 * PI;
    vec3 earthOrbitPosition = vec3(cos(earthOrbitalAngle), 0.0, sin(earthOrbitalAngle)) * 2.0;
    mat4 earthTranslationMatrix = createTranslationMatrix(earthOrbitPosition);
    earthOrbitPosition = (earthTranslationMatrix * vec4(earthOrbitPosition, 1.0)).xyz + sunCenter;
    earthCenter = earthOrbitPosition;

    float moonOrbitalAngle = mod(time1 / moonOrbitalPeriod, 1.0) * 2.0 * PI;
    vec3 moonOrbitPosition = vec3(cos(moonOrbitalAngle), 0.0, sin(moonOrbitalAngle)) * 0.5;
    mat4 moonTranslationMatrix = createTranslationMatrix(moonOrbitPosition);
    moonOrbitPosition = (moonTranslationMatrix * vec4(moonOrbitPosition, 1.0)).xyz + earthOrbitPosition;
    moonCenter = moonOrbitPosition;

    // Light properties
    Light sunLight;
    sunLight.position = vec3(0.0, 0.0, 0.0); // Position at the center of the Sun
    sunLight.light = vec3(1.0, 1.0, 1.0); // Specular light color

    // Intersect against a sphere of radius 1 centered at the origin
    vec3 dir = normalize(d);

    // Sphere 4: Skybox
    vec3 skyboxDir = normalize(d);
    float phi = acos(skyboxDir.z);
    float theta = atan(skyboxDir.y, skyboxDir.x);
    color = texture(texSamplerSkybox, vec2(1.0 + 0.5 * theta / PI, phi / PI));

    float nearestIntersection = 1e30; // Or any large positive value

    // Sphere 1: Sun
    float sunIntersection = intersectSphere(p, dir, sunCenter, sunRadius);
    if (sunIntersection > 0.0 && sunIntersection < nearestIntersection) {
        nearestIntersection = sunIntersection;
        vec3 ipoint = (p + sunIntersection * dir).xyz;
        vec3 normal = normalize(ipoint - sunCenter);
        normal.z = -normal.z;
        normal = normal.xzy;

        // Determine texture coordinates in spherical coordinates for the transformed point
        float phi = acos(normal.z);
        if (abs(normal.x) < 0.001) {
            theta = sign(normal.y) * PI * 0.5;
        } else {
            theta = atan(normal.y, normal.x);
        }

        // Multiply the textured color with the finalColor
        color = texture(texSamplerSun, vec2((time1 / sunRotationPeriod) + 0.5 * theta / PI, phi / PI));
    }

    // Sphere 2: Earth
    float earthIntersection = intersectSphere(p, dir, earthCenter, earthRadius);
    if (earthIntersection > 0.0 && earthIntersection < nearestIntersection) {
        nearestIntersection = earthIntersection;
        // Determine intersection point
        vec3 ipoint = (vec3(p + earthIntersection * dir)).xyz;
        vec3 normal = normalize((ipoint - earthCenter));
        vec3 N = normal;
        vec3 lightDirection = normalize(sunLight.position - ipoint);
        vec3 R = reflect(-lightDirection, N);
        vec3 V = normalize(p-ipoint);
        normal.z = -normal.z;
        normal = normal.xzy;

        // Ambient component
        vec3 ambientColor = 0.1*sunLight.light;

        // Shadow calculations
        // Cast a ray towards the sun
        float earthIntersection = intersectSphere(ipoint, lightDirection, earthCenter, earthRadius);
        // Cast a ray towards the moon
        float moonIntersection = intersectSphere(ipoint, lightDirection, moonCenter, moonRadius);

        // Diffuse component
        float diffuseFactor = max(dot(N, lightDirection), 0.0);
        if (moonIntersection > 0.0 && earthIntersection < 1.0) {
            diffuseFactor = 0;
        }
        vec3 diffuseColor = sunLight.light * diffuseFactor;

        // Specular component
        float specularFactor = pow(max(dot(R, V), 0.0), 10.0);  // R : reflection dir, V: view vect
        vec3 specularColor = sunLight.light * specularFactor;

        // Determine texture coordinates in spherical coordinates for the transformed point
        float phi = acos(normal.z);
        if(abs(normal.x) < 0.001) {
            theta = sign(normal.y)* PI * 0.5; 
        } else{
            theta = atan(normal.y , normal.x); 
        }

        // Multiply the textured color with the finalColor
        color = vec4((ambientColor + diffuseColor + specularColor), 1.0) * texture(texSamplerEarth, vec2((time1 / earthRotationPeriod) + 0.5 * theta / PI, phi / PI));
    }

    // Sphere 3: Moon
    float moonIntersection = intersectSphere(p, dir, moonCenter, moonRadius);
    if (moonIntersection > 0.0 && moonIntersection < nearestIntersection) {
        nearestIntersection = moonIntersection;
        // Determine intersection point
        vec3 ipoint = (vec3(p + moonIntersection * dir)).xyz;
        vec3 normal = normalize((ipoint - moonCenter));
        vec3 N = normal;
        vec3 lightDirection = normalize(sunLight.position - ipoint);
        vec3 R = reflect(-lightDirection, N);
        vec3 V = normalize(p-ipoint);
        normal.z = -normal.z;
        normal = normal.xzy;

        // Ambient component
        vec3 ambientColor = 0.1*sunLight.light;

        // Shadow calculations
        // Cast a ray towards the sun
        float earthIntersection = intersectSphere(ipoint, lightDirection, earthCenter, earthRadius);
        // Cast a ray towards the moon
        float moonIntersection = intersectSphere(ipoint, lightDirection, moonCenter, moonRadius);

        // Diffuse component
        float diffuseFactor = max(dot(N, lightDirection), 0.0);
        if (earthIntersection > 0.0 && moonIntersection < 1.0) {
            float diffuseFactor = 0;
        }
        vec3 diffuseColor = sunLight.light * diffuseFactor;

        // Specular component
        float specularFactor = pow(max(dot(R, V), 0.0), 10.0);
        vec3 specularColor = sunLight.light * specularFactor;

        // Determine texture coordinates in spherical coordinates for the transformed point
        float phi = acos(normal.z);
        if(abs(normal.x) < 0.001) {
            theta = sign(normal.y)* PI * 0.5; 
        } else{
            theta = atan(normal.y , normal.x); 
        }

        // Multiply the textured color with the finalColor
        color = vec4((ambientColor + diffuseColor + specularColor), 1.0) * texture(texSamplerMoon, vec2((time1 / moonRotationPeriod) + 0.5 * theta / PI, phi / PI));
    }
}
