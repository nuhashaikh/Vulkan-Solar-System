
# Instructions

1. Clone the repo 
2. cd build
3.  cd HW4
4. cmake ..
5. make -j10
6. ./HW4

# Spheres and Texture Coordinates

For loading texture coordinates I followed the same principles as HW3:
1. Read pixels using stbi library
2. created Vulkan image
3. created image view
4. created sampler
5. created descriptor set layout
6. created descriptor pool size
7. allocated descriptor sets
8. descriptor writes to update values and send to GPU

Using these textures I created a sphere with the given formula:
color = texture(texSamplerSun, vec2((time1 / sunRotationPeriod) + 0.5 \* theta / PI, phi / PI));

# Ray Tracing

Works by tracing rays from a virtual camera through each pixel and calculates the resulting color based on intersections with sphere representations of
our 3 bodies, sun, earth and moon.

# Transformation and Control

Axial Rotation: handled during creation of the sphere texture(texSamplerSun, vec2((time1 / sunRotationPeriod) + 0.5 \* theta / PI, phi / PI)) with the
(time1 / sunRotationPeriod)

Orbital Rotation: first we calculate the orbital angle using the orbital period, create a vector backed on this angle -> cos(earthOrbitalAngle), 0.0, sin(earthOrbitalAngle), create translation matrix based of the orbitPosition, apply translation to this position and add the centre of whatever body, it is rotating around and update the objects centre.

# Shading

Applies phong shading model with the sun as the light source. Account for diffuse, ambient and specular lighting.

# Shadow Rays

I have shadow rays implemented as well.
