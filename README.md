
# Instructions

1. Clone the repo
2. mkdir build
3. cd build
4. cd HW4
5. cmake ..
6. make -j10
7. ./HW4

# Spheres and Texture Coordinates

For texture mapping I followed the principles highlighted in Vulkan tutorials:
https://vulkan-tutorial.com/Texture_mapping/Images
https://vulkan-tutorial.com/Texture_mapping/Image_view_and_sampler
https://vulkan-tutorial.com/Texture_mapping/Combined_image_sampler

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
![image](https://github.com/nuhashaikh/Vulkan-Solar-System/assets/73035984/c6161c38-6524-41bc-b4ee-50410c98a3e1)


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
![image](https://github.com/nuhashaikh/Vulkan-Solar-System/assets/73035984/920d5ae2-5997-4d7a-a39b-e0180b22e063)

