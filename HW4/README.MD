# Instructions

** I started working on the HW before changes were pushed out for all textures to be loaded on
starter.frag thus I have that work I have done on my own**
I worked off of this commit -> Commit: d5e8902a9f3ac4e12e610e9272a969f6ade30426

1. Clone the repo https://csgit.ucalgary.ca/ualim/453VulkanStarter
2. Switch to the HW3 branch
3. In the HW3/ folder copy the contents of Main.cpp, Object.cpp, Object.h
4. In the assets/shaders folder copy contents of starter.frag
5. For things to work on the current commit:
   - change the contents of /shared/CMakeLists.txt
   - create new file /shared/Path.cpp and copy contents in
   - create new file /shared/Path.hpp and copy contents in

6. Follow the below commands (same as previous commands)
7. cd into 453VulkanStarter
8. cd build
9.  cd HW4
10. cmake ..
11. make -j10
12. ./HW4

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

Orbital Rotation: first we calculate the orbital angle using the orbital period, create a vector backed on this angle -> cos(earthOrbitalAngle), 0.0, sin(earthOrbitalAngle), create translation matrix based of the orbitPosition, apply translation to this position and add the centre of whatever body
it is rotating around and update the objects centre.

# Shading

Applies phong shading model with the sun as the light source. Account for diffuse, ambient and specular lighting.

# BONUS

# Shadows [Implemented]
Using shadow rays and ray tracing I modified the lighting calculation to cast a shadow on an object if something was between it and the light source.
