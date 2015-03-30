angular.module('GUIOPFG').factory('Converter', [function() {
    var factory = {};
    var string = [];
    //Contaner object
    var file= {
        //Declare variables
        fileName:           'myParticleFile {',
        material:           {name: 'material', val: 'Examples/Flare' + '\n'},
        quota:              { name: 'quota', value: 10 },
        particle_width:     { name: 'particle_width', val: 100 },
        particle_heigth:    { name: 'particle_height', val: 100 },
        emmiter:            { name: 'emitter', type: 'Point' + '\n' + '{',
                                val: {angle: {name: 'angle', val: 0},
                                        colour: {name: 'colour', red: 1, green: 1, blue: 1, alpha: 1},
                                        direction: {name: 'direction', x: 1, y: 0, z: 0},
                                        emission_rate: {name: 'emission_rate', value: 10},
                                        position: {name: 'position', x: 0, y: 0, z: 0},
                                        velocity: {name: 'velocity', val: 1},
                                        time_to_live: {name: 'time_to_live', val: 5},
                                        duration: {name: 'duration', val1: 0},
                                        repeat_delay: {name: 'repeat_delay', val: 0}}}
    };

    //Declare funtions
    factory.setEmissionRate = function(obj){
        file.emmiter.val.emission_rate.value = obj.val;
    };

    factory.setQuota = function(obj){
        file.quota.value = obj.val;
    };

    factory.setBoxShape = function(obj){
        file.emmiter.type = 'Box' + '\n' +'{';
        file.emmiter.val.width = {
            name: 'width', val: Math.abs(obj.w)
        };
        file.emmiter.val.height = {
            name: 'height', val: Math.abs(obj.h)
        };
        file.emmiter.val.depth = {
          name: 'depth', val: Math.abs(obj.w)
        };
    };

    factory.setName = function(obj){
        file.fileName = obj.name + ' ' + '{';
    };

    factory.setPosition = function(obj){
        file.emmiter.val.position.x = obj.x;
        file.emmiter.val.position.y = obj.y;
        file.emmiter.val.position.z = obj.z;
    };

    factory.setLineForceAffector = function(obj){
        file.LinearForce = {
            name: '\n' + 'affector', type: 'LinearForce' + '\n' + '{',
            force_vector: {name: 'force_vector', x: obj.x, y: obj.y, z: 0},
            force_application: {name: 'force_application', val: 'add'}
        };
    };

    factory.setHeightAndWidth = function(obj){
        file.particle_width.val = obj.width;
        file.particle_heigth.val = obj.height;
    };

    factory.setDuration = function(obj){
        delete file.emmiter.val.duration_min;
        delete file.emmiter.val.duration_max;
        file.emmiter.val.duration = {name: 'duration', val1: obj.duration.value};
    };

    factory.setRandomDuration = function(obj){
        delete file.emmiter.val.duration;
        file.emmiter.val.duration_min = {name: 'duration_min', value: obj.min};
        file.emmiter.val.duration_max = {name: 'duration_max', value: obj.max};
    };

    factory.setDirection = function(obj){
        file.emmiter.val.direction.x = obj.x;
        file.emmiter.val.direction.y = obj.y;
    };

    factory.setVelocity = function(obj){
        file.emmiter.val.velocity.val = obj.velocity;
    };

    factory.setAngle = function(obj){
        file.emmiter.val.angle.val = obj.angle;
    };

    factory.setTimeToLive = function(obj){
        if(obj.time.random){
            delete file.emmiter.val.time_to_live;
            file.emmiter.val.time_to_live_min = {name: 'time_to_live_min', val: obj.time.startTime};
            file.emmiter.val.time_to_live_max = {name: 'time_to_live_max', val: obj.time.endTime};
        }else{
            delete file.emmiter.val.time_to_live_min;
            delete file.emmiter.val.time_to_live_max;
            file.emmiter.val.time_to_live = {name: 'time_to_live', val: obj.time.value};
        }
    };

    factory.setColor = function(obj){
        obj.string = obj.string.replace('rgba(', '');
        obj.string = obj.string.replace(')', '');
        obj.string = obj.string.split(",");
        file.emmiter.val.colour.red = (Number(obj.string[0]) / 255).toFixed(2);
        file.emmiter.val.colour.green = (Number(obj.string[1]) / 255).toFixed(2);
        file.emmiter.val.colour.blue = (Number(obj.string[2]) / 255).toFixed(2);
        file.emmiter.val.colour.alpha = Number(obj.string[3]);
    };

    factory.setRandomizer = function(obj){
        file.randomizer = {
            name: '\n' + 'affector', type: 'DirectionRandomizer' + '\n' + '{',
            randomness: {name: 'randomness', val: obj.rand},
            scope: {name: 'scope', val: obj.scope},
            keep_velocity: {name: 'keep_velocity', val: 'false'}
        };
    };

    factory.debug = function(){
        console.log(file);
    };

    var toString2 = function(obj){
        for(var i in obj){
            if(obj.hasOwnProperty(i)){
                if(typeof obj[i] === "object"){
                    if(obj[i].name === 'emitter'){
                        string.push('\n');
                        string.push(toString2(obj[i]));
                        string.push('\n } \n');
                    }else{
                        string.push('\n');
                        string.push(toString2(obj[i]));
                    }
                }else{
                    string.push(obj[i]);
                }
            }
        }
    };

    factory.toString = function(){
        string = [];
        string.push('particle_system');
        for(var i in file){
            if(file.hasOwnProperty(i)){
                if(typeof file[i] === "object"){
                    if(file[i].name === 'emitter'){
                        string.push('\n');
                        string.push(toString2(file[i]));
                        string.push('\n } \n');
                    }else{
                        string.push('\n');
                        string.push(toString2(file[i]));
                    }
                }else{
                    string.push(file[i]);
                }
            }
        }
        console.log(string);
        return string.join(" ") + '\n' + '}';
    };



    return factory;
}]);
