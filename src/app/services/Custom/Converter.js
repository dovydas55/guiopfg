angular.module('GUIOPFG').factory('Converter', [function() {
    var factory = {};
    
    //Contaner object
    var file= {
    	//Declare variables
    	fileName: 			'myParticleFile',
    	quota: 				{ name: 'quota', val: 10 },
    	particle_width: 	{ name: 'particle_width', val: 100 },
    	particle_heigth: 	{ name: 'particle_heigth', val: 100 },
    	emmiter: 			{ name: 'emmiter', type: 'point ', 
    							val: {angle: {name: 'angle', val: 0},
                                        colour: {name: 'colour', red: 1, green: 1, blue: 1, alpha: 1},
    									direction: {name: 'direction', x: 1, y: 0, z: 0},
    									emission_rate: {name: 'emission_rate', val: 10},
    									position: {name: 'position', x: 0, y: 0, z: 0},
    									velocity: {name: 'velocity', val: 1},
    									time_to_live: {name: 'time_to_live', val: 5},
    									duration: {name: 'duration', val: 0},
    									repeat_delay: {name: 'repeat_delay', val: 0}}}
    };

	//Declare funtions
    factory.setBoxShape = function(obj){
        file.emmiter.type = 'Box';
        file.emmiter.val.width = {
            name: 'width', val: obj.w
        };
        file.emmiter.val.height = {
            name: 'height', val: obj.h
        };
        file.emmiter.val.depth = {
          name: 'depth', val: obj.w  
        };
        //console.log(file);
    };

    factory.setName = function(obj){
        file.fileName = obj.name;
        //.log(obj);
    };

    factory.setPosition = function(obj){
        file.emmiter.val.position.x = obj.x;
        file.emmiter.val.position.y = obj.y;
        file.emmiter.val.position.z = obj.z;
        //console.log(obj);
    };    

	factory.setLineForceAffector = function(obj){
        file.LinearForce = {
            name: 'affector', type: 'LinearForce',
            force_vector: {name: 'force_vector', x: obj.x, y: obj.y, z: 0},
            force_application: {name: 'force_application', val: 'add'}
        };
        //console.log(file.LinearForce);
    };

    factory.setHeightAndWidth = function(obj){
        file.particle_width = obj.width;
        file.particle_heigth = obj.height;
        //console.log(obj);
    };

    factory.setDuration = function(obj){
        file.emmiter.val.duration = obj.duration;
        //console.log(obj);
    };

    factory.setRandomDuration = function(obj){
        delete file.emmiter.val.duration;
        file.emmiter.val.duration_min = obj.min;
        file.emmiter.val.duration_max = obj.max;
        //console.log(obj);
    };

    factory.setDirection = function(obj){
        file.emmiter.val.direction.x = obj.x;
        file.emmiter.val.direction.y = obj.y;
        //console.log(obj);
    };

    factory.setVelocity = function(obj){
        file.emmiter.val.velocity = obj.velocity;
        //console.log(obj);
    };

    factory.setAngle = function(obj){
        file.emmiter.val.angle = obj.angle;
        //console.log(obj);
    };

    factory.setTimeToLive = function(obj){
        if(obj.random){
            delete file.emmiter.val.time_to_live;
            file.emmiter.val.time_to_live_min = obj.startTime;
            file.emmiter.val.time_to_live_max = obj.endTime;
            //console.log(file.emmiter.val.time_to_live_min);
            //console.log(file.emmiter.val.time_to_live_max);
        }else{
            file.emmiter.val.time_to_live = obj.time.value;
            //console.log(file.emmiter.val.time_to_live);    
        }
        //console.log(obj);
    };

    factory.setColor = function(obj){
        obj.string = obj.string.replace('rgba(', '');
        obj.string = obj.string.replace(')', '');
        obj.string = obj.string.split(",");
        file.emmiter.val.colour.red = (Number(obj.string[0]) / 255).toFixed(2);
        file.emmiter.val.colour.green = (Number(obj.string[1]) / 255).toFixed(2);
        file.emmiter.val.colour.blue = (Number(obj.string[2]) / 255).toFixed(2);
        file.emmiter.val.colour.alpha = Number(obj.string[3]);    
        //console.log(file.emmiter.val.colour);
    };

    factory.setRandomizer = function(obj){
        file.randomizer = {
            name: 'affector', type: 'DirectionRandomizer',
            randomness: {name: 'randomness', val: obj.rand},
            scope: {name: 'scope', val: obj.scope},
            keep_velocity: {name: 'keep_velocity', val: 'false'}
        };
        //console.log(file.randomizer);
    };

    factory.setBox = function(obj){

    };

	factory.debug = function(){
		console.log(file);
	};

	return factory;
}]);
