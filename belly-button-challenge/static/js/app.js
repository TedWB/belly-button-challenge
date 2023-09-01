const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

let dropdownMenu = d3.select("#selDataset");
d3.json(url).then((data) => {
    
    let names = data.names;
    console.log(names);
    names.forEach((name) => {  
        dropdownMenu.append("option").text(name).property("value", name);
    });
});

function demoInfo(sample){
    d3.json(url).then((data)=>{
       let meta = data.metadata;
       console.log("this function gets called")
       let metadata = meta.filter((person)=> person.id == sample);
       let values = metadata[0];
       console.log("this is value data",values);
       d3.select("#sample-metadata").html("");
       Object.entries(values).forEach(([key,value]) => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`)
    });

    });
};

function hbar(sample){
    d3.json(url).then((data)=>{
        let overallData = data.samples;
        let ourSample = overallData.filter((person)=> person.id ==sample);
        let ourSample2 = ourSample[0];
        let sample_values = ourSample2.sample_values;
        let otu_ids = ourSample2.otu_ids;
        let otu_labels = ourSample2.otu_labels;
        let topTenY = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let topTenX = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        let barData = {
            x: topTenX,
            y: topTenY,
            type: "bar",
            orientation:"h",
            text: labels,
            marker: {
                color: 'rgb(124, 252, 0)'
              }
          };
          let layout = {
            height: 600,
            width: 800,
            title: "Top 10",
            font:{
                family: 'Copperplate'
              },
          };
          Plotly.newPlot("bar", [barData], layout);
    });

};

function bubbles(sample){
    d3.json(url).then((data)=>{
        let overallData = data.samples;
        let ourSample = overallData.filter((person)=> person.id ==sample);
        let ourSample2 = ourSample[0];
        console.log("our sample 2 is actually being grabbed",ourSample2);
        let sample_values = ourSample2.sample_values;
        let otu_ids = ourSample2.otu_ids;
        let otu_labels = ourSample2.otu_labels;
        let bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker:{
                color: otu_ids,
                colorscale: "Portland",
                size: sample_values
            }
        };
        console.log("This is bubble",bubbleTrace);
        let layout = {
            title: "Bacteria Per Sample",
            font:{
                family: 'Copperplate'
              }
            
        };
        Plotly.newPlot("bubble",[bubbleTrace],layout);
    });
   
}

function optionChanged(sampleNum){
demoInfo(sampleNum);
hbar(sampleNum);
bubbles(sampleNum);
};

function init(){
    d3.json(url).then((data)=>{
        let names = data.names;
        let startName = names[0];
        demoInfo(startName);
        hbar(startName);
        bubbles(startName);
       
    });

}
init();