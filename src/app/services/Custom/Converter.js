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
	factory.setLineForceAffector = function(obj){
        file.LinearForce = {
            name: 'affector', type: 'LinearForce',
            force_vector: {name: 'force_vector', x: obj.x, y: obj.y, z: 0},
            force_application: {name: 'force_application', val: 'add'}
        }
        //console.log(file.LinearForce);
    };

    factory.setHeightAndWidth = function(obj){
        file.particle_width = obj.width;
        file.particle_heigth = obj.height;
        //console.log(obj);
    };

    factory.setRandomDuration = function(obj){
        delete file.emmiter.val.duration;
        file.emmiter.val.duration_min = obj.min;
        file.emmiter.val.duration_max = obj.max;
        console.log(obj);
    };

	factory.fetchValues = function(obj){
		console.log(obj);
	};


	factory.debug = function(){
		console.log(file);
	};

	return factory;
}]);
