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
    
    // call Plot functions:
    barPlot(data.names[0]);
    bubblePlot(data.names[0]);
    updateinfo(data.names[0]);
    // call builtgauge function:
    // buildgauge(data.names[0]);
  });
}

init();


// set the function to create bar plots
function barPlot(subjectid){
//read through the json data file 
  d3.json("samples.json").then((data) => {
    // filter the sample object, locate the one that ID is the same as the subjectid
    sampleData=data.samples.filter(i => i.id=== subjectid)[0];
   console.log(sampleData)
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
      Plotly.newPlot("bar",data,barlayout)

       
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
// set the function to update infor box
// function updateinfo(subjectid){
//   d3.json("samples.json").then((data) => {
//     // filter the sample object, locate the one that ID is the same as the subjectid
//     metaData =data.metadata.filter(i => i.id=== subjectid)[0];        
//           // //create the info box 
//           // var metaData = data.metadata
//     console.log(metaData);
//           //select the result of infobox
//           var demoInfo = metaData.filter(i => i.id===subjectid)[0];
//           //select the frequency of wach
//           // var wfreq = results.wfreq
      
//           //select the infor box area
//           var infoBox = d3.select("#sample-metadata")
    
//           //empty the demographci info panel eath time before getting the new id
//           infoBox.html("");
    
//           //grab the necessaty demographic data for the id and append the info to the infobox
//           Object.entries(demoInfo).forEach((d) => {infoBox.append("h5").text(d[0].toUpperCase() + ":"+ "\n"+ d[1] + "\n")});
          
  
//     });
//     }

function updateinfo(subjectid){
  d3.json("samples.json").then((data) => {
      
      //create the info box 
      var metadata = data.metadata
      //select the result of infobox
      var results = metadata.filter(d => d.id.toString()===subjectid)[0];
      //select the frequency of wach
      // var wfreq = results.wfreq
  
      //select the infor box area
      var infoBox = d3.select("#sample-metadata")

      //empty the demographci info panel eath time before getting the new id
      infoBox.html("");

      //grab the necessaty demographic data for the id and append the info to the infobox
      Object.entries(results).forEach((d) => {infoBox.append("h5").text(d[0].toUpperCase() + ":"+ "\n"+ d[1] + "\n")});
      
      
})
};











// function buildgauge(idNames){
//   d3.json("samples.json").then((data) => {
      
//       //create the info box 
//       var metadata = data.metadata
//       //select the result of infobox
//       var results = metadata.filter(d => d.id.toString()===idNames)[0];
//       //select the frequency of wach
//       var wfreq = results.wfreq
  
//       //select the infor box area
//       var infoBox = d3.select("#sample-metadata")

//       //empty the demographci info panel eath time before getting the new id
//       infoBox.html("");

//       //grab the necessaty demographic data for the id and append the info to the infobox
//       Object.entries(results).forEach((d) => {infoBox.append("h5").text(d[0].toUpperCase() + ":"+ "\n"+ d[1] + "\n")});
      
//       var data2 = [
//           {
//             type: "indicator",
//             mode: "gauge+number+delta",
//             value: wfreq,
//             title: { text: "Belly Button Washing Frequency", font: { size: 24 ,family:"Arial Rounded MT Bold"} },
//             delta: { reference: 5, increasing: { color: "RebeccaPurple" } },
//             gauge: {
//               axis: { range: [null, 9], tickwidth: 2, tickcolor: "gray", splitNumber:8 },
           
//               bar: { color: "rgb(13, 38, 85)" },
//               bgcolor: "white",
//               borderwidth: 2,
//               bordercolor: "gray",
//               steps: [
//                 {range:[0,1], color:"rgba(0, 105, 11, .5)"},
//                 {range:[1,2], color:"rgba(10, 120, 22, .5)"},
//                 {range:[2,3], color:"rgba(14, 127, 0, .5)"},
//                 {range:[3,4], color:"rgba(110, 154, 22, .5)"},
//                 {range:[4,5], color:"rgba(170, 202, 42, .5)"},
//                 {range:[5,6], color:"rgba(202, 209, 95, .5)"},
//                 {range:[6,7], color:"rgba(210, 206, 145, .5)"},
//                 {range:[7,8], color:"rgba(232, 226, 202, .5)"},
//                 {range:[8,9], color:"rgba(240, 230, 215, .5)"},
//               ],
//               threshold: {
//                 line: { color: "red", width: 4 },
//                 thickness: 0.75,
//                 value: wfreq
//               }
//             }
//           }
//         ];
        
//         var layout2 = {
//           width: 500,
//           height: 400,
//           margin: { t: 25, r: 25, l: 25, b: 25 },
//           paper_bgcolor: "white",
//           font: { color: "rgb(13, 38, 85)", family:"Arial Rounded MT Bold" }
//         };
        
      
//       // Plot Gauge Chart
      
//       Plotly.newPlot("gauge", data2, layout2);
// })
// };  
function optionChanged(idNames) {
  barPlot(subjectid);
  bubblePlot(subjectid);
  updateinfo(subjectid)
  // buildgauge(idNames);
}