# FoundryVttMapMaker

A simple wysiwyg editor for Foundry VTT.

Try it out:
https://claydegruchy.github.io/foundry-vtt-map-maker/dist/

# How do I use this

Instructions are insde the tool but:

-   Drag the outlined box (building component) to place a room.
-   Click on a box in the toolbox to spawn a new building component.
-   Click on a placed building component to resize or rotate
-   All touching components will merge into a single room
-   Hit export to get a Foundry VTT scene.
-   Import the scene into Foundry. Add doors and other features from there.

# How does it work

The tool uses konvajs to render a build area. The shapes in the build area are combined using Turfjs, the shapes from which are then calculated into a scene for VTT.

# Why

I found the foundry default builder very clunky for making simple, quick maps (WAY too many clicks), so I made this tool as a precursor to a map generator that I might never make. This thing was made mostly for the Alien RPG and so has theming to that end.
