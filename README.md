# Interactive-Dashboards

Belly Button Biodiversity

In this challenge, an interactive dashboard is built to explore the Belly Button Biodiversity dataset, which catalogues the microbes that colonize human navels.
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

The below steps were followed to build the interactive dashboard where all of the plots and information box are updated any time that a new sample is selected:

1. Use the D3 library to read in samples.json.
2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
* Use sample_values as the values for the bar chart.
* Use otu_ids as the labels for the bar chart.
* Use otu_labels as the hovertext for the chart.
3. Create a bubble chart that displays each sample.
* Use otu_ids for the x values.
* Use sample_values for the y values.
* Use sample_values for the marker size.
* Use otu_ids for the marker colors.
* Use otu_labels for the text values.
4. Display the sample metadata, i.e., an individual's demographic information.
5. Display each key-value pair from the metadata JSON object on the page.
6. Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ to plot the weekly washing frequency of the individual. Modify the example gauge code to account for values ranging from 0 through 9.
7. Update all of the plots any time that a new sample is selected.

The dashboard displays as per below:

![webpagedisplay](https://user-images.githubusercontent.com/82508049/130358074-886cebbc-21ff-4e04-a641-c50d9600779a.png)


