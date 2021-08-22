// set the function to create bar plots
function barPlot(subjectid){
//read through the json data file 
  d3.json("samples.json").then((data) => {
    // filter the sample object, locate the one that ID is the same as the subjectid
    // console.log(data.samples[0]);
    sampleData=data.samples.filter(i => i.id=== subjectid)[0];
    // console.log(sampleData);
    //get the top 10 otu id
    var top10 = sampleData.otu_ids.slice(0,10);     
    var otutop10 = top10.map(t => "OTU "+ t);

    // get the top 10 otu values
    var top10value= sampleData.sample_values.slice(0,10).reverse();
      
    // get the top 10 otu lavels 
    var top10lables = sampleData.otu_labels.slice(0,10).reverse();
      
    // set up the trace of the bar chart
    var bartrace = {
          x:top10value,
          y:otutop10,
          text:top10lables,
          orientation : 'h',
          marker: {
          color: '0069b3'},
          type:"bar",
          }
    var data = [bartrace];

    //create the layout variable to set plots layout
    var barlayout = {
          font:{family:"Courier New, monospace"},
          title:"Top 10 Bacteria Cultures Found",
          yaxis:{
              tickmode:"linear",
          },
          margin:{
              l:120,
              r:40,
              t:40,
              b:40
          }
      }
      Plotly.newPlot("bar",data,barlayout);      
});
}
    

// set the function to create bubble plots
function bubblePlot(subjectid){
  //read through the json data file 
  d3.json("samples.json").then((data) => {
    // filter the sample object, locate the one that ID is the same as the subjectid
    sampleData=data.samples.filter(i => i.id=== subjectid)[0];
    // console.log(sampleData)
      
    //Create the bubble chart
    var bubbletrace = {
          x : sampleData.otu_ids,
          y : sampleData.sample_values,
          mode: "markers",
          marker:{
              color:['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)','rgb(120,120,120)', 'rgb(120,120,120)', 'red', 'rgb(120,120,120)'],
              size:sampleData.sample_values
            },
          text:sampleData.otu_labels
          }
  
    //set the layout for the bubble plot
    var bubblelayout ={
          title:"Bacteria Cultures per sample",
          font:{family:"Courier New, monospace"},
          xaxis:{
              title:"OTU ID",
          },
        }
    var data2 = [bubbletrace];
  
    Plotly.newPlot("bubble",data2,bubblelayout)      
  });
  }

function updateinfo(subjectid){
  d3.json("samples.json").then((data) => {
      
      //set the metadata
      var metadata = data.metadata
      //filter through the metadata via subjectID
      var info = metadata.filter(d => d.id.toString()===subjectid)[0];
     
      //select the infor box area
      var infoBox = d3.select("#sample-metadata")

      //clear the infor box each time before render the new data
      infoBox.html("");

      //grab the necessaty demographic data for the id and append the info to the infobox
      Object.entries(info).forEach((i) => {infoBox.append("h6").text(i[0].toUpperCase() + ":"+ i[1] )});
      
})
};


function gaugeplot(subjectid){
  d3.json("samples.json").then((data) => {
      
      //set the metadata
      var metadata = data.metadata
      //filter through the metadata via subjectID
      var info = metadata.filter(d => d.id.toString()===subjectid)[0];
      //set the wash frequency as a varible 
      var washes = info.wfreq
    
      var data3 = [
        {
          type: "indicator",
          mode: "gauge+number+delta",
          value: washes,
          title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
          delta: { reference: 5, increasing: { color: "RebeccaPurple" } },
          gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "darkblue" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            steps: [
              { range: [0, 4], color: "cyan" },
              { range: [5, 10], color: "royalblue" }
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: washes
            }
          }
        }
      ];
      
      var gaugelayout = {
        width: 500,
        height: 400,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "white",
        font: { color: "darkblue", family: "Courier New, monospace" }
      };
      
      // Plotly.newPlot('myDiv', data, layout);
      
      Plotly.newPlot('gauge', data3, gaugelayout);
});
}

// Set init function to render subject ID and run plots functions
function init() {
  //select the dropdown area
  var dropdown = d3.select("#selDataset");

  //read through the json data file     
  d3.json("data/samples.json").then((data)=>{
    //locate the ID data and set it to subjectID, append it to a drowpdown list
    subjectIDs = data[Object.keys(data)[0]] 
    // console.log(subjectID);   
    subjectIDs.forEach(function(id){
    // console.log(id);
      dropdown.append("option").text(id);              
    });
    
    // call functions:
    barPlot(data.names[0]);
    bubblePlot(data.names[0]);
    updateinfo(data.names[0]);
    gaugeplot(data.names[0]);
  });
}

init();

function optionChanged(subjectid) {
  barPlot(subjectid);
  bubblePlot(subjectid);
  updateinfo(subjectid);
  gaugeplot(subjectid);
}