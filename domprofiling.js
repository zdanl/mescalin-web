var dom = {};
var probes = []; 
var specimen = {};

function inspect_element(type, element) {
    if (element.prototype) {
        specimen[type] = typeof(element.protoype.__proto__);
    } else {
        specimen[type] = typeof(element.__proto__.__proto__);
    }
    console.log(specimen);
}

for (var property in window) {
    var probe = eval("window." + property);
    var probe_type = typeof(probe);
    if (probes.indexOf(probe_type) == -1) {
        console.log("Will take on sample of " + probe_type);
        probes.push(probe_type);
        inspect_element(probe_type, probe);
    }
}
