#version 450

layout(location = 0) in vec3 position;
//layout(location = 1) in vec3 inNormal; 

// ray positions and directions in world coordinates 
// to be passed to fragment shader
layout(location=0) out vec3 p;
layout(location=1) out vec3 d;

//push constants block
layout( push_constant ) uniform constants
{
	mat4 model;
	mat4 invView;
    vec4 proj;
} pushConstants;

void main() {
    //uv = vec2(0.5*position.x + 0.5, 0.5*position.y + 0.5 );

    
    float near = pushConstants.proj.x;
    float far = pushConstants.proj.y; 
    float aspect = pushConstants.proj.z;
    float fov = radians(0.5*pushConstants.proj.w);
    
    
    // position and direction of ray in world space for ray tracing
    // flip y for Vulkan
    vec3 ray = vec3(position.x*near*aspect*tan(fov), -position.y*near*tan(fov), -1.0*near);
    vec4 result = pushConstants.invView * vec4(ray, 1.0);
    p = result.xyz;
    //p = vec3(position.x, position.y, position.z);

    result = pushConstants.invView * vec4(ray, 0.0);
    d = result.xyz;

    // position for rasterization
    gl_Position =  vec4(position.x, position.y, position.z, 1.0);
}
