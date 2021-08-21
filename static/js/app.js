// Set init function to render subject ID and run plots functions
function init() {
  //select the dropdown area
  var dropdown = d3.select("#selDataset");

  //read through the json data file 
  d3.json("samples.json").then((data) => {

      //locate the ID data and set it to subjectID, append it to a drowpdown list
      
      d3.json("data/samples.json").then((data)=>{
        // console.log(data);
        subjectID = data[Object.keys(data)[0]] 
        // console.log(subjectID);   
        subjectID.forEach(function(id){
          // console.log(id);
          dropdown.append("option").text(id);})           
         
    });
      drawPlot(data.names[0]);
      buildgauge(data.names[0]);
  });
}

init();




// function drawPlot(idNames){
//   //read samples json first
//   d3.json("samples.json").then((data) => {
     
//       //get the sample array match the idnames
//       var sample = data.samples.filter(s => s.id.toString() === idNames)[0];
      
//       //get the top 10 otu id
//       var otuidstop10 = (sample.otu_ids.slice(0,10)).reverse();
    
//       // change the format of out id for bar plot
//       var otuforplot = otuidstop10.map(d => "OTU "+ d)
      
//       // find the sample_values for id
//       var samplevalues = sample.sample_values.slice(0,10).reverse()
      
//       //find the otu lable 
//       var otulabels = sample.otu_labels.slice(0,10)
      
//       // set up the trace of the bar chart
//       var trace = {
//           x:samplevalues,
//           y:otuforplot,
//           text:otulabels,
//           orientation : 'h',
//           marker: {
//               color:'#005a99'},
//           type:"bar",
//           }
//       var data = [trace];

//       //create the layout variable to set plots layout
//       var layout = {
//           font:{family:"Arial Rounded MT Bold"},
//           title:"Top 10 Bacteria Cultures Found",
//           yaxis:{
//               tickmode:"linear",
//           },
//           margin:{
//               l:100,
//               r:50,
//               t:100,
//               b:30
//           }
//       }
//       Plotly.newPlot("bar",data,layout)
      
//       //Create the bubble chart
//       var trace1 = {
//           x : sample.otu_ids,
//           y : sample.sample_values,
//           mode: "markers",
//           marker:{
//               color:['rgb(253, 210, 191)','rgb(255, 107, 107)','rgb(182, 25, 25)','rgb(1, 36, 67)','rgb(70, 70, 96)','rgb(54, 139, 133)','rgb(180, 184, 151)','rgb(241, 233, 229)','rgb(0, 30, 108)','rgb(3, 83, 151)','rgb(80, 137, 198)','rgb(255, 170, 76)','rgb(236, 214, 98)','rgb(93, 130, 51)','rgb(40, 78, 120)','rgb(62, 33, 93)'],
//               size:sample.sample_values
//           },
//           text:sample.otu_labels
//       }

//       //set the layout for the bubble plot
//       var layout1 ={
//           font:{family:"Arial Rounded MT Bold"},
//           xaxis:{
//               title:"OTU ID",
//           },
//       }
//       var data1 = [trace1];

//       Plotly.newPlot("bubble",data1,layout1)
//   });   
// }


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
// function optionChanged(idNames) {
//   drawPlot(idNames);
//   buildgauge(idNames);
// }