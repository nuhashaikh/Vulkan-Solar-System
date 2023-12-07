# Install script for directory: C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV

# Set the install prefix
if(NOT DEFINED CMAKE_INSTALL_PREFIX)
  set(CMAKE_INSTALL_PREFIX "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/out/install/x64-Debug")
endif()
string(REGEX REPLACE "/$" "" CMAKE_INSTALL_PREFIX "${CMAKE_INSTALL_PREFIX}")

# Set the install configuration name.
if(NOT DEFINED CMAKE_INSTALL_CONFIG_NAME)
  if(BUILD_TYPE)
    string(REGEX REPLACE "^[^A-Za-z0-9_]+" ""
           CMAKE_INSTALL_CONFIG_NAME "${BUILD_TYPE}")
  else()
    set(CMAKE_INSTALL_CONFIG_NAME "Debug")
  endif()
  message(STATUS "Install configuration: \"${CMAKE_INSTALL_CONFIG_NAME}\"")
endif()

# Set the component getting installed.
if(NOT CMAKE_INSTALL_COMPONENT)
  if(COMPONENT)
    message(STATUS "Install component: \"${COMPONENT}\"")
    set(CMAKE_INSTALL_COMPONENT "${COMPONENT}")
  else()
    set(CMAKE_INSTALL_COMPONENT)
  endif()
endif()

# Is this installation the result of a crosscompile?
if(NOT DEFINED CMAKE_CROSSCOMPILING)
  set(CMAKE_CROSSCOMPILING "FALSE")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib" TYPE STATIC_LIBRARY FILES "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/out/build/x64-Debug/VulkanLaunchpad/external/glslang/SPIRV/SPIRVd.lib")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/lib/cmake" TYPE FILE FILES "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/out/build/x64-Debug/VulkanLaunchpad/external/glslang/SPIRV/SPIRVTargets.cmake")
endif()

if(CMAKE_INSTALL_COMPONENT STREQUAL "Unspecified" OR NOT CMAKE_INSTALL_COMPONENT)
  file(INSTALL DESTINATION "${CMAKE_INSTALL_PREFIX}/include/glslang/SPIRV" TYPE FILE FILES
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/bitutils.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/spirv.hpp"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/GLSL.std.450.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/GLSL.ext.EXT.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/GLSL.ext.KHR.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/GlslangToSpv.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/hex_float.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/Logger.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/SpvBuilder.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/spvIR.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/doc.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/SpvTools.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/disassemble.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/GLSL.ext.AMD.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/GLSL.ext.NV.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/NonSemanticDebugPrintf.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/NonSemanticShaderDebugInfo100.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/SPVRemapper.h"
    "C:/Users/Mansoor/Desktop/453_HW1_Final/453VulkanStarter/VulkanLaunchpad/external/glslang/SPIRV/doc.h"
    )
endif()

