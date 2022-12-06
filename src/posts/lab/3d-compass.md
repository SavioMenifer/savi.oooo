---
title: "Unity Tutorial: Making a 3D Compass"
subtitle: Scripting a 3D handheld compass in Unity that also works in VR
date: 2022-12-06
description:
    In this tutorial, I show you how to create a 3D handheld compass game object in Unity that can be moved and rotated in 3D space, while the needle keeps pointing in a specified target direction.
color: "#d8a200"
tags: lab
layout: lab
---

*A video version of this tutorial is available [here](https://www.youtube.com/watch?v=vlTcJgWVzus).*

I recently wanted to create a handheld compass for a VR game that I am working on. This seemingly simple goal took me a day of fiddling around with rotations and quaternions, until I found a solution that was simple and satisfactory enough. Here, I share what I learned so that you can easily implement similar functionality in your games and apps. Let's see how our compass works:

![A screen recording of the Unity editor showing a compass being moved around and rotated, while the compass needle always points to a sphere in the center of the world.](assets/lab/3d-compass/compass.mp4 "As you can see, the compass points towards the sphere in the middle, but we can also make it point towards a specific direction (e.g. North), much like a traditional compass"){.contained}

To start, we first create a simple compass object consisting of a compass body and a needle. The *Compass Body* is a simple cylinder primitive that is squashed along the y-axis to create a flat disc.

![Unity screenshot showing a flattened cylinder which makes up the base of our compass.](assets/lab/3d-compass/compass-base.png){.contained}

Next, we create a simple needle which is an elongated cube that is aligned parallel to the compass body, outward from the center. This *Needle* will rotate along the y-axis of the compass body, to point towards our *Target* direction.

![Unity screenshot showing an elongated cube which makes up the needle of our compass.](assets/lab/3d-compass/compass-needle.png){.contained}

To make rotating the needle easier, we first create an empty GameObject called *Needle Parent* as a child of the compass body, and reset its position and rotation so that it is perfectly aligned with the compass body. The Needle is then added as a child under this *Needle Parent*.

![Unity screenshot showing the needle parented under an empty GameObject called Needle Parent, which is parented under the compass body with its position and rotation set to zero.](assets/lab/3d-compass/compass-empty.png){.contained}

When creating your compass, pay attention to the rotation of each GameObject. It can be helpful to switch Unity's *Tool Handle Rotation* setting to *Local*, and ensure that their rotations match the ones shown in this tutorial. This tutorial is written with the assumption that the *Needle* is aligned towards the positive z-axis when creating the compass.

To make the needle point towards our *Target*, we will write a script to rotate the *Needle Parent* along the y-axis. This script will be attached to the *Needle Parent*.

We first need to specify a *Target* that our compass will point towards. This *Target* can be a GameObject, a point, or a specific direction (e.g. `Vector3.Forward`). In our case, we use a sphere GameObject in the scene that is referenced as `targetObject`. We first obtain the position of this `targetObject`:

```cs
Vector3 target = targetObject.transform.position;
```

If we want to use a general direction instead of a GameObject, the target position can be obtained by adding the desired direction vector to the transform of the *Needle Parent*:

```cs
Vector3 target = transform.position + Vector3.forward; // (to make needle point north)
```

The target position that we obtained is in the **World** space. To correctly determine the needle rotation even when the compass itself is rotated, we need the obtain the position of our *Target* in the **Local** space of our compass. So, we convert the World space coordinates of the *Target* to the **Local** space coordinates of our compass body (which is the parent of the *Needle Parent* GameObject that the script is attached to):

```cs
Vector3 relativeTarget = transform.parent.InverseTransformPoint(target);
```

Once we have the `relativeTarget` coordinates, we can determine how much the needle should rotate along the y-axis so that it points towards the Target. We use the `Mathf.Atan2` function to calculate the needle rotation. `Atan2(x, z)` calculates the angle between the ray from the origin to the point `(x, z)` and the z-axis, as shown in the figure below. This is how much our needle should rotate.

![Atan2(x, z) returns the angle θ between the ray from the compass's center to the point (x, z) and the positive z-axis.](assets/lab/3d-compass/atan.jpg){.contained}

Since `relativeTarget` is in the **Local** space, the origin in the context of `Atan2` is the origin of the compass body, not of the world itself. Also, we do not use the y coordinate of `relativeTarget` since our needle is flat on the body of our compass, and it does not show any information about the y elevation of our target. Since `Atan2` gives us an angle in radians, we convert it to degrees and obtain our `needleRotation` as follows:

```cs
float needleRotation = Mathf.Atan2(relativeTarget.x, relativeTarget.z) * Mathf.Rad2Deg;
```

Now, all we need to do is to apply this `needleRotation` to our *Needle Parent*. To do this, we apply a `localRotation` to our transform, passing the `needleRotation` as the y rotation and keeping the x and z rotations as zero:

```cs
transform.localRotation = Quaternion.Euler(0, needleRotation, 0);
```

Our final script looks like this:

```cs
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PointCompass : MonoBehaviour
{
    public GameObject targetObject;

    void Update()
    {
        // get worldspace coordinates of target
        Vector3 target = targetObject.transform.position;
        // Vector3 target = transform.position + Vector3.forward; // (to make needle point north)

        // convert to local coordinate space of compass body
        Vector3 relativeTarget = transform.parent.InverseTransformPoint(target);

        // determine needle rotation with atan2
        float needleRotation = Mathf.Atan2(relativeTarget.x, relativeTarget.z) * Mathf.Rad2Deg;

        // apply needle rotation
        transform.localRotation = Quaternion.Euler(0, needleRotation, 0);
    }
}
```

That's it! The compass should now always point towards the *Target*. The code above is the minimum required to make the compass work, but you can modify it to make it even better. For example, you could make the `needleRotation` change smoothly with a specified speed with `Mathf.Lerp`. Hope it helped!