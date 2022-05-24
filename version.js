const createScene = function () {
    
    const scene = new BABYLON.Scene(engine);

    const camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
    camera.upperBetaLimit = Math.PI / 2.2;
    camera.attachControl(canvas, true);
    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));

    const spriteManagerTrees = new BABYLON.SpriteManager("treesManager", "textures/palm.png", 2000, {width: 512, height: 1024}, scene);

    //We create trees at random positions
    for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * (-30);
        tree.position.z = Math.random() * 20 + 8;
        tree.position.y = 0.5;
    }

    for (let i = 0; i < 500; i++) {
        const tree = new BABYLON.Sprite("tree", spriteManagerTrees);
        tree.position.x = Math.random() * (25) + 7;
        tree.position.z = Math.random() * -35  + 8;
        tree.position.y = 0.5;
    }
    
    //Skybox
    const skybox = BABYLON.MeshBuilder.CreateBox("skyBox", {size:150}, scene);
	  const skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
	  skyboxMaterial.backFaceCulling = false;
	  skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
	  skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
	  skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
	  skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
	  skybox.material = skyboxMaterial;

    BABYLON.SceneLoader.ImportMeshAsync("", "https://assets.babylonjs.com/meshes/", "valleyvillage.glb");
      // The first parameter can be used to specify which mesh to import. Here we import all meshes
    BABYLON.SceneLoader.ImportMesh("", "https://cdn.jsdelivr.net/gh/bastienOptionizr/metaverse_assets@c5747aeff72499f95dd43210cad50d90f6771315/", "plane.glb", scene, function (newMeshes) {
        // Set the target of the camera to the first imported mesh
        plane  = newMeshes[0]
        plane.position.y = 10;
        const animPlaneZ = new BABYLON.Animation("planeZAnimation", "position.z", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        const planeZKeys = []; 
        var init_z = -25
        var frame = 0;
        var avancement_z = 5;

        for (var i = 0; i <10; i++){
            planeZKeys.push({
                frame: frame,
                value: init_z
            });
            frame = frame + 15;
            init_z = init_z + avancement_z;
        }

        animPlaneZ.setKeys(planeZKeys);

        plane.animations = [];
        plane.animations.push(animPlaneZ);

        const animPlaneY = new BABYLON.Animation("planeYAnimation", "position.y", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        const planeYKeys = []; 
        var init_y = 10
        var frame = 0;
        var avancement_y = -1;

        for (var i = 0; i <10; i++){
            planeYKeys.push({
                frame: frame,
                value: init_z
            });
            frame = frame + 50;
            init_y = init_y + avancement_y;
        }

        animPlaneY.setKeys(planeYKeys);

        plane.animations.push(animPlaneY);


        scene.beginAnimation(plane, 0, 300, true);
        
        var terrain = BABYLON.Mesh.CreateGroundFromHeightMap("terrain", "heightMap.png", 100, 100, 100, 0, 10, scene, false);

	// Create the mix material
	var mix = new BABYLON.MixMaterial("mix", scene);

	// Mix texture 1 (RGBA) is required
	mix.mixTexture1 = new BABYLON.Texture("/playground/textures/mixMap.png", scene);

	// Mix texture 2 (RGBA) is optional
	mix.mixTexture2 = new BABYLON.Texture("/playground/textures/mixMap_2.png", scene);
    });
    return scene;
};
