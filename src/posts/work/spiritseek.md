---
title: Spirit Seek
subtitle: A VR hide and seek game for light-hearted social fun
date: 2023-01-23
description:
    Spirit Seek is a co-located social VR game that is centred around playfulness and connection. It adds a twist to the classic game of hide and seek, where players take the form of tiny mischievous forest spirits hiding among grass and plants in a lush natural environment. The game runs on connected Quest headsets, bringing together the freedom of hand tracking and the unique possibilities of VR spaces into a portable pop-up experience.
cover:
    src: assets/work/spiritseek/thumb2.jpg
    alt: A stylised garden environment with a tiny cute spirit creature peeking from behind a grass blade.
    blur-color: "#459a3e"
color: "#5fcf4e"
tags: work
layout: work
---

Spirit Seek is a co-located social VR game that is centred around playfulness and connection. It adds a twist to the classic game of hide and seek, where players take the form of tiny mischievous forest spirits hiding among grass and plants in a lush natural environment. The game runs on connected Quest headsets, bringing together the freedom of hand tracking and the unique possibilities of VR spaces into a portable pop-up experience for 2-6 players. {.intro .larger}

::: info
###### Type
Internship project

###### Work done
- Game design
- Interaction design
- Development
- 3D design

###### Tools
Unity, Normcore, Blender

###### Date
January 2023
:::

<figure class="wide">
<lite-youtube videoid="wsqoB22ZFLE" style="background-image: url('assets/work/spiritseek/thumb.jpg');"></lite-youtube>
</figure>

## Background

During my internship at Studio VRij, I had the opportunity to use their VR tracking system to create something unique. The system is centred around the concept of total freedom in VR—one where people can put on a standalone headset like the Quest 2 and walk around in a physical space to experience a virtual reality world. The system relies on hand tracking instead of controllers, and needs no external devices other than the headset itself, providing a truly untethered experience. It is also made to be enable social experiences, where many people can come together in a physical space and experience VR together. Spirit Seek was born as a project to create a fun, playful experience using this VR tracking system.

:::: contained-figure-text
![Three people wearing VR headsets in a large empty space, walking around in the physical space while playing hide and seek in the virtual space.](assets/work/spiritseek/tracking.mp4)
::: group
*A spectator's view of hide and seek showing the tracking system with standalone headsets and hand tracking*
:::
::::

## Ideation

While thinking about games that can be played in a co-located space, we thought of traditional games such as hide and seek, and tag. What we loved about these games is that they let people move around in the play space freely, and have lots of fun interacting with each other. Taking key concepts from these games as inspiration, we thought about how we can adapt them to a VR experience. Using our room-scale tracking system, we could transform an empty play space into a magical new world to play games in. This meant that we could play a game like hide and seek in entirely new and unreal environments that would not be possible in real life.

One of the unique possibilities within VR spaces is to create a sense of scale in a virtual world. For example, if you had a house in VR, you could view it from the perspective of an ant on the floor, or you could be a giant peering into a window as if it were a doll house. The world I designed for Spirit Seek was heavily inspired by the 2010 Studio Ghibli film *Arrietty*, where the main character is a tiny person living in the walls and floor of a house. At first, I envisioned the world as a small garden patch with players as miniature creatures scurrying about. The natural environment could provide many nooks and crannies to hide behind, while being a relaxing setting to play in.

![A screenshot of a Miro board showing various images of nature, flowers, and gardens. Two stills from the film Arrietty are also present.](assets/work/spiritseek/moodboard.jpg "Moodboard showing stills from Arrietty, along with other inspiration"){.contained}

## How the game works

Spirit Seek differs from classic hide and seek in a few ways. The seeker and hiders both have goals—the seeker has to catch all the hiders, while the hiders have to collect orbs scattered around while evading the seeker. The team to first complete their goal wins. This meant that hiders could not stay in one spot, and had to keep moving. This was an intentional design decision to make the game more balanced. The limited area of the play space meant that the seeker could do a full sweep in a short time. Encouraging hiders to move around added a fun chase element to the gameplay.

## Creating the world

I created a prototype of the game world in Neos VR. This allowed me to view and manipulate world elements in VR, and quickly get a sense of what the world would look like from a player perspective. Here, I experimented with different elements such as grass, rocks and other elements that players could hide behind. After creating a layout for the world, I used Blender to create the more detailed 3D environment. The environment includes both 3D models I created myself, and ones from Sketchfab which I tweaked in Blender for my needs.

![A player perspective of the game world, showing plants, grass, and sunlight shafts through the tree above.](assets/work/spiritseek/lookup.jpg){.contained}

The textures for the world were created in Substance Painter. It was my first time using this software, and it was a very rewarding experience learning how to create textures from scratch. I had a lot of fun discovering its capabilities, thanks to the many tutorials on YouTube.

![A screenshot of Substance Painter with textures for Spirit Seek.](assets/work/spiritseek/texturing.jpg "Creating the textures in Substance Painter"){.contained}

The avatars I created for Spirit Seek were inspired by the forest spirits in Japanese folklore called *kodama.* I wanted to create cute, playful avatars that reflected the mischievous, goofy gameplay that Spirit Seek was all about. I created two subtly different types of avatars for the hiders and seeker. In the game, players have the ability to choose a colour for their avatar.

![Two cute-looking avatars side by side. The avatars have oblong heads and a disconnected floating egg-shaped body. The left avatar has mushrooms on its head, while the right avatar has a leaf stalk.](assets/work/spiritseek/avatars.mp4 "Avatars for seeker (left) and hider (right)"){.contained}

## Interactions

One of the interesting parts of the design of Spirit Seek was how to communicate the game state and goals to players. I created a hand UI similar to a wristwatch that players could quickly glance at. With this, players can know if they are a hider or seeker, how many hiders are remaining, or how many orbs that they had to collect. The UI changes depending on the game state, bringing up the most relevant information at the right time for players.

![Side by side shots of the wrist-based hand UI. The UI has text and graphical elements conveying the current game state and goals to players.](assets/work/spiritseek/handui.jpg "Hand UI showing game states and goals"){.contained}

A peculiar problem that I encountered during design was how the seeker could “catch” a hider in the game. The traditional way of tagging a player by touching them was tricky in co-located VR, as the avatars did not precisely correspond to the body of the player, and getting too close to the other player could cause them to bump into each other. The solution to this was a “grab” interaction where the player could make a fist, and their hand would fly out in front of them. This allows the seeker to catch the hider from a safe distance, with a fun side-effect that you could punch others by squeezing your hand :)

![A perspective view of the player in game, where they make a fist with their hands and their virtual hand extends a little bit forward, allowing them to catch another player.](assets/work/spiritseek/handextend.mp4 "Hand interaction to catch a hider"){.contained}

Spirit Seek was developed in Unity, with Normcore providing the multiplayer functionality. While it was challenging to learn at first, Normcore let me create and manage game states and data models easily. Aside from C# scripting, I also made use of Unity’s Shader Graph and VFX Graph to create procedural visual elements for the game. For example, the water shader used in the game was custom made, optimised for performance in the Quest 2.

## Future

Spirit Seek is a fun, light hearted way to play with others in a room-scale VR space. It is very easy to set up in a large empty space, requiring only a few standalone headsets. This makes it perfect for VR pop-ups events where many people can play together. The game will be part of future editions of Studio VRij’s [VR for Everyone](https://www.studio-vrij.com/projects/oba) initiative, where people can experience it first-hand.

::: slider

![A bird's eye view of the world in Spirit Seek.](assets/work/spiritseek/lookdown.jpg)

![A view of the world from the seeker's point of view](assets/work/spiritseek/seekerpov.jpg)

![A wide shot of the world in Spirit Seek.](assets/work/spiritseek/wideworld.jpg)

![A scene with two hiders in the world.](assets/work/spiritseek/hiders.jpg)

:::

## Credits

My incredibly talented friend Naveen Raj created the music and natural ambience for Spirit Seek. Check out his [SoundCloud](https://soundcloud.com/toyfone) for more of his work!

I’m very grateful to the beautiful people of Studio VRij—[Joelle](http://kineticmud.space), Mila, and Sammie for the helpful tips, support and the opportunity to create this game during my internship. Special thanks to Ajay Varma for helping me out with the trailer video!

The following artists created and shared some of the 3D assets that helped bring this world to life:

<details>
<summary><h4>View attributions<h4></summary>

- Adapted work based on [Desert Rocks](https://sketchfab.com/3d-models/desert-rocks-d333ebf8ead74697a1428bafdb97d26b) by [MartynaGrek](https://sketchfab.com/MartynaGrek) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Saintpaulia flowers high-poly](https://sketchfab.com/3d-models/saintpaulia-flowers-high-poly-cace4f8d3c4846faa40796d883cdcd88) by [Elena FF](https://sketchfab.com/elenaferfor) *licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/).*
- Adapted work based on [Aster red](https://sketchfab.com/3d-models/aster-red-dfdd87f0524441c0bc909009ed3a91ed) by [tojamerlin](https://sketchfab.com/tojamerlin) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Strawberry](https://sketchfab.com/3d-models/strawberry-6e95a8cb47114f2285be08a70e8990b6) by [Senbit](https://sketchfab.com/senbit3591) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Lilypads](https://sketchfab.com/3d-models/lilypads-9c55bc7d174a42878a47f31c2895a607) by [sligocreatures](https://sketchfab.com/sligocreatures) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Flowers](https://sketchfab.com/3d-models/flowers-e9e8b1ca9d3640f8be00b760e1fad170) by [Hippocrocaduck](https://sketchfab.com/Hippocrocaduck) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Flowers Petunia White](https://sketchfab.com/3d-models/flowers-petunia-white-74c653b4413f40ba8ec753004b2deea0) by [Marianne Goudriaan](https://sketchfab.com/mariannegoudriaan) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Office plants (FREE)](https://sketchfab.com/3d-models/office-plants-free-cb1b515ef96b4bdda0f19393d22c6a54) by [Polza](https://sketchfab.com/8.in.glasses) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [log](https://sketchfab.com/3d-models/log-b1dbfb8ff4d84a4cb5094772262e14d7) by [DiegoSaitta.3d](https://sketchfab.com/DiegoSaitta.3d) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Stylized log and plants](https://sketchfab.com/3d-models/stylized-log-and-plants-ebb24bf837854680b6d6451fd952e690) by [Cyril43](https://sketchfab.com/Cyril43) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Fantasy Plants](https://sketchfab.com/3d-models/fantasy-plants-197497f04a1344bab6eb59fff69b57ef) by [DarkAaron999](https://sketchfab.com/Aaron999) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [flower](https://sketchfab.com/3d-models/flower-0fa50cf622f44f2ba59eff6c11cb8fbd) by [tojamerlin](https://sketchfab.com/tojamerlin) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Plants Ready](https://sketchfab.com/3d-models/plants-ready-7cb66b15705447f9a3fb533a33e2d73f) by [Marbles studio](https://sketchfab.com/marblesstudio) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Mangrove V1](https://sketchfab.com/3d-models/mangrove-v1-38f441fb86624c38aebcc85b9e66e90b) by [santiago.salmon](https://sketchfab.com/santiago.salmon) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*
- Adapted work based on [Low Poly Mushroom Assets](https://sketchfab.com/3d-models/low-poly-mushroom-assets-420d50a94d13420885587e2ff569d761) by [drhope](https://sketchfab.com/drhope) *licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).*

</details>