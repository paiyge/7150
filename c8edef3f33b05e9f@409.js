function _1(md){return(
md`# National Parks and Resident Species
This visualization is made of two interactive rings. The outer ring contains mammalian species found in U.S. National Parks. The inner ring has the names of the parks. To use, hover over one of the circles. If you hover over an animal in the outer ring, the corresponding park circles will be emphasized in the inner ring. The same is true for the outer circle if you hover over a park name in the inner circle. Using this graphic, you are able to identify what species are found in which parks and which parks have what species, making it easier to identify animals you might see when visiting. `
)}

function _2(d3,datos)
{
  // 1. Create the drawing area
  const svg = d3.create('svg')
    .attr("viewBox", [-datos.width / 2, -datos.height / 2, datos.width, datos.height]);
 
  // Create circles for parks and species
  const circle = svg.selectAll('circle')
    .data(datos.park_list.concat(datos.species_list))
    .enter()
    .append("circle")
    .attr('r', d => d.radius)
    .attr('cx', d => d.x)
    .attr('cy', d => d.y)
    .attr('name', d => d.name)
    .attr('relation_list', d => d.relation_list)
    .attr('opacity', 1)
    .style('fill', d => d.color);

  // Create text labels for people and objects
  const text = svg.selectAll("text")
    .data(datos.park_list.concat(datos.species_list))
    .enter()
    .append("text")
    .attr("dy", ".35em")
    .attr("transform", d => `
          rotate(${(d.angle * 180 / Math.PI)})
          translate(${d.general_radius + d.text_translation})
          ${Math.cos(d.angle) < 0 ? "rotate(180)" : ""}
          `)
    .attr("text-anchor", d => Math.cos(d.angle) < 0 ? "end" : null)
    .attr("font-size", "14px")
    .attr('opacity', 1)
    .text(d => d.name);

  // Mouseover on circles
  circle.on('mouseover', function (d) {
    svg.selectAll('circle')
      .filter(function (e) {
        return (e.relation_list.indexOf(d.name) < 0) && (d.name != e.name);
      })
      .attr('opacity', 0.1);

    svg.selectAll('text')
      .filter(function (e) {
        return (e.relation_list.indexOf(d.name) < 0) && (d.name != e.name);
      })
      .attr('opacity', 0.1);

    svg.selectAll("path")
      .filter(function (e) {
        return e.relation_list.indexOf(d.name) < 0;
      })
      .attr('opacity', 0.1);
  }).on('mouseout', function (d) {
    svg.selectAll('circle').attr('opacity', 1.0);
    svg.selectAll('text').attr('opacity', 1.0);
    svg.selectAll("path").attr('opacity', 1.0);
  });

  // 6. Return the SVG node
  return svg.node();
}


function _3(md){return(
md`# CS 7250 Final Project
### What species will you find in each national park?`
)}

function _4(md){return(
md`## Intro
This project involves visualizing the National Parks Service (NPS) Species in National Parks Database, with a focus on creating an intuitive method for identifying species in various parks and illustrating the connectivity between parks based on biodiversity.

There are two main objectives of the visualization:
- Species Identification: Simplify the process of identifying species in different national parks.
- Biodiversity Connectivity: Showcase the interconnectedness of national parks based on shared biodiversity.

The chosen data visualization approach is a circular network encoding, specifically a circular arc diagram. This approach was selected for its unique ability to balance aesthetics and functionality, serving the dual purpose of improved legibility and visual appeal. By using this encoding we are providing:
- Clarity and Distinction: The circular format allows for a clear distinction between parks and species. Each park becomes a distinct segment, and the arcs connecting them represent shared species.
- Readability and Cohesiveness: Circular visualizations often provide better readability compared to linear representations, and the cohesiveness of a circle enhances the viewer's understanding of the overall system.
- Representation of Wholeness: Circles are commonly associated with representing the entirety of something. In this context, the circular format represents the idea of the National Park System as a whole, with each park contributing to the larger ecosystem.
- Ease of Interpretation: Circular arcs facilitate the visualization of connections between parks, offering an intuitive way to understand how biodiversity is shared across different regions.`
)}

function _5(md){return(
md`## Dataset Description`
)}

function _6(md){return(
md`This dataset was created and distributed by the National Parks Service (NPS) which is an agency within the U.S. Department of the Interior. The NPS preserves unimpaired the natural and cultural resources and values of the National Park System for the enjoyment, education, and inspiration of this and future generations.

[NPS Species in National Parks Database](https://irma.nps.gov/NPSpecies/)

The NPS publishes databases of animal and plant species identified in individual national parks and verified by evidence — observations, vouchers, or reports that document the presence of a species in a park. All park species records are available to the public on the National Park Species portal; exceptions are made for sensitive, threatened, or endangered species when widespread distribution of information could pose a risk to the species in the park. The main purpose of the dataset is to report and monitor biodiversity in our wild spaces. The two databases deal with the same data but in different domains. The [Species Database](https://irma.nps.gov/NPSpecies/Search/SpeciesList) allows you to select a park and explore the species found in it. The [Parks Database](https://irma.nps.gov/NPSpecies/Search/Species) allows you to select a species and explore the parks where it is found. 

Each park species record includes a species ID, park name, taxonomic information, scientific name, one or more common names, record status, and occurrence (verification of species presence in park). Taxonomic classes have been translated from Latin to English for species categorization; order, family, and scientific name (genus, species, subspecies) are in Latin.

There were several preprocessing steps required to work with this data. The raw data is show below for Acadia National Park (the whole dataset entire dataset is very large). 

##### Step 1
To begin, several columns were removed that would not be necessary in the final work. Columns removed were Park Code, Category Sort, Taxon Code, TSN, and Taxon Record.

##### Step 2
The next step was to create a data set that would be able to be visualized. In it's current form, there would be too much data to incorporate into my desired visualization. 
1. Category: There are 6 types of wildlife present, Vascular Plants, Birds, Mammals, Fish, Amphibians, and Reptiles. I selected Mammals as those are what most people are familiar with and look forward to seeing. I also debated on using Birds as I grew up in a place with Birders but the category was too large.
2. Occurrence: There are several options for occurrence, Present, Probably Present, Not Present, Not Confirmed, and instances left blank. Only rows with "Present" were kept.
3. Scientific Name: Any row with a blank instance of Scientific Name was removed.
4. Common Names: Any row with a blank instance of Common Names was removed.

##### Step 3
This step was extremely tedious. As we can see in the Common Names column, there may be many common names for one scientific name. As this is the main point of the visualization, it required cleanup. Each common name was separated into as many columns as there were names, between 1 and 6. The whole data set was then sorted based on Scientific Name and placed in alphabetical order. The most common occurrence of each Common Name was then assigned to the group as a whole. For instance, Odocoileus virginianus goes by both "white-tailed deer" and "Virginia deer". There were more instances of white-tailed deer so that common name was chosen. In instances where it was not obvious or there were many different common names, the Scientific Name was searched and that common name was used. This process took many hours as there were hundred of species when I originally reached this step. 

Once preprocessing was completed I selected the columns of interest I was to make the visualization with. In the end, only Park Name and Common name were used.
`
)}

function _7(__query,raw,invalidation){return(
__query(raw,{from:{table:"raw"},sort:[],slice:{to:null,from:null},types:[{name:"Category",type:"string"}],filter:[],select:{columns:null}},invalidation,"raw")
)}

function _8(htl){return(
htl.html`Step 1`
)}

function _data(__query,step1,invalidation){return(
__query(step1,{from:{table:"step1"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation,"step1")
)}

function _10(md){return(
md`Step 2`
)}

function _11(__query,step2,invalidation){return(
__query(step2,{from:{table:"step2"},sort:[],slice:{to:null,from:null},filter:[{type:"eq",operands:[{type:"column",value:"Category"},{type:"resolved",value:"Mammal"}]},{type:"nn",operands:[{type:"column",value:"Scientific Name"}]}],select:{columns:["#","Park Name","Category","Order","Family","Scientific Name","Common Names","Occurrence"]}},invalidation,"step2")
)}

function _12(md){return(
md`## Design Rationale
There are two main purposes for this visualization that impacted the design decision. 
1. I wanted an easier method for identifying what species could be found in what parks.
2. A way to show how parks are connected by their biodiversity.

There were several iterations of ideas for how to accomplish both of these goals. 

My original idea was the create network graph overlayed onto a map of the United States. Each national park would be rooted to the latitude and longitude proved by NPS using a form of edge bundling. A tooltip would provide information on each animal and park. The added bonus of this idea is the connectivity of the parks is clearer and it gives a visual for how widespread certain species are. I ended up not going with this encoding as  I was unable to get the bundling to work and I find network encodings to be messy and difficult to interact with. 

My second idea was a standard arc encoding to try the more organized version of a network graph. I ran into an issues immediately with the number of species. I felt the distinction between parks and species wasn't clear enough, I didn't like that they were all in the same line. Additionally, the single line was incredibly long which made for it to be unusable. Even if the two categories were separated, somewhat like a sankey, it would still be too long to be legible on many screens. 

The third and final idea was to make the arc diagram into a circle. I was already interested in coercing an encoding into a circle shape after exploring a different dataset all together. I quite like how cohesive and eye catching circular visualizations are. I'm aware that circles tend to be used to represent the whole of something, whether that be percent, time, how much pie you eat on Christmas Eve. However, I think about each park as one piece of the larger parks system and each species as one piece of this country's biodiversity and the circle shape does not seem out of place. The circularity also allowed for me to make the clear distinction between parks and species while still being legible. 

For the interactivity portion I was considering several avenues including tooltips containing information about either the species or the park, an image of the species or the park, a link to an official website with information about the species or the park, and others. I decided the mouseover interaction would be the most aesthetically pleasing after seeing some examples from D3.`
)}

function _13(md){return(
md`## Development Process
- Task distribution
 - As this was an individual project I completed every tasks of the project.
- Tools employed (I'm not entirely sure what you mean by this)
 - A lot of D3, cheat sheets, examples, guides, step by step demonstrations, the professors lectures and notebooks.
 - Excel for data processing, as well as helper guides for certain equations needed for cleaning.
 - Online json checker for finding mistakes
- Hours allotment
 - Data acquisition: 2 hours
 - Data exploration and preprocessing: 6 hours (this was so incredibly tedious I almost regret it)
 - Top level design process: 2 hours
 - Visualization: 10 hours
 - json trouble shooting: 1 hour (I was unfamiliar with jsons so wanted to get some practice with them during this)
`
)}

function _14(md){return(
md`## Feedback Incorporation: 
As stated in a private, I was unable to take integrate much of the critique suggestions. However, much of the opinion was shared both by myself and my peers. 
1. The large number of species makes the visualization crowded and slightly difficult to read.
2. A filtering system, drop down menu, or search function to more easily search for an species or park rather than going alphabetically by hand through the list.
3. General readability could be improved. The text is rather small and cramped.
4. Ensure user understand how to interact. 

How each were integrated:
1. I decreased the species present in the visualization. Instead of all mammals, i selected just bats and squirrels. I selected these as bats are the largest type of mammals after rodents and are very important to the ecosystems they live in, and squirrels as personally I didn't know how many types of squirrels there are.
2. I was unable to integrate this. If I had been able to, I would have opted for a filtering system that allowed you to both look at the full picture and narrow down the search. The full picture is important to me to be able to see what species parks have in common across the country. The filtering would allow a user to view only there pieces of interest and improve readability and useably.
3. The text size was increased and spaced out once species instances were removed.
4. I wanted to incorporate an animation to demonstrate how to use the viz by highlighting interesting pieces of information in a vignette style. However, given the circumstances, I was unable to instantiate it and opted instead for a statement of use directly under the title.

There were also an interesting idea of incorporating a tooltip that displayed more information about the species. I had also toyed with this idea, as well as including an image of the animal as well as a link to an official site. I placed this idea to the side early on as it seemed too large for the scope of an individual project. I am interested in creating further interactions of this visualization and will consider this idea as well as the critique points I was not able to accomplish during this semester. `
)}

function _15(md){return(
md`## Final Thoughts

Overall, I am pleased with the outcome of this project. I was not able to enact the entire plan I had for the data, but I have produced a fun, interactive, and eye-catching way to explore something I'm personally interested in. 

Things I have Learned
I was able to learn many new things and improve on old skills during this project. I now have a fair amount of D3 familiarity and have now worked with and created jsons for the first time. I understand better now how different elements of a visualization can either help or hinder a viewers ability to interpret the desired information. Additionally, I was able to explore and consider many new types of encoding and graphic ideas. 

Future Ideas
I have already touched on some things I would do differently in the future design wise, but I think next time I would explore a different aspect of the data. This visualization is heavy on the visual, it is eye-catching and novel and has many avenues to explore at your leisure. Next time, I'm interested in the story telling ability data possesses. Instead of giving the user nearly full access to a dataset, instead walk them through some interesting part that I have uncovered. `
)}

function _16(md){return(
md`## Acknowledgments
- D3's viz library was integral to this, I used these as references for the bits and pieces to put this together. Particularly [the gallery ](https://observablehq.com/@d3/gallery).
- [A comprehensive review on the role of online media in sustainable business development and decision making](https://link.springer.com/article/10.1007/s00500-022-06993-1)
 - Where I got the main idea for the diagram from. This paper has super interesting visuals which I stumbles across while googling different encoding types. 
 - Formal citation: He, H. A comprehensive review on the role of online media in sustainable business development and decision making. Soft Comput 26, 10789–10803 (2022). https://doi.org/10.1007/s00500-022-06993-1
- [D3 graph gallery tooltip documentation](https://d3-graph-gallery.com/graph/interactivity_tooltip.html)
- [Juan Marchese](https://observablehq.com/@juanmarchese/chord) inspired the interactivity portion.
- [Eric Lo's arc diagram](https://observablehq.com/@analyzer2004/arc-diagram). He is also just so creative and good at what he does.`
)}

function _17(md){return(
md`## Other bits and bobbins`
)}

function _18(md){return(
md`#### Original Version
https://observablehq.com/d/9e6bbd9445e11837`
)}

function _19(md){return(
md`#### Viz helper functions`
)}

function _circleGenerator(d3){return(
function circleGenerator(original_data, general_radius, text_translation, color_scale, angle_increment) {
  var result = [];
  var coordinates = new Map;
  var quantities = new Map;

  var max_scale = d3.max(original_data, d => d.values.length);
  var min_scale = d3.min(original_data, d => d.values.length);
  var radius_scale = d3.scaleLinear()
    .domain([min_scale, max_scale])
    .range([10, 10]);

  var object_id = 0;
  original_data.forEach(d => {
    var new_object = Object();
    new_object.name = d.name;
    new_object.angle = object_id * angle_increment;
    new_object.id = object_id;
    new_object.x = general_radius * Math.cos(object_id * angle_increment);
    new_object.y = general_radius * Math.sin(object_id * angle_increment);
    new_object.radius = radius_scale(d.values.length);
    new_object.color = color_scale(object_id);
    new_object.general_radius = general_radius;
    new_object.text_translation = text_translation;
    new_object.relation_list = d.values;

    quantities.set(new_object.name, d.values.length);

    coordinates.set(new_object.name, {
      x: new_object.x,
      y: new_object.y,
      name: new_object.name,
      color: color_scale(object_id)
    });

    result.push(new_object);
    object_id = object_id + 1;
  });

  return {
    result,
    coordinates,
    quantities
  };
}
)}

async function _datos(FileAttachment,d3,circleGenerator)
{
  const raw_data = await FileAttachment("bands.json").json();
  //const raw_data = gh("https://raw.githubusercontent.com/paiyge/7150/main/data.json")
  //  .then(response => response.json())
  const width = 1200;
  const height = 1200;

  // Drawing area
  const center_x = width / 2;
  const center_y = height / 2;
  const park_radius = 175;
  const species_radius = 400;

  // Circle count
  const num_parks = raw_data.parks.length;
  const num_species = raw_data.species.length;

  const park_color = d3.scaleSequential()
    .domain([0, num_parks])
    .interpolator(d3.interpolateHslLong("rgba(0, 29, 237, 0.4)", "rgba(0, 29, 237, 0.4)"));

  const species_color = d3.scaleSequential()
    .domain([0, num_species])
    .interpolator(d3.interpolateRgb("rgba(255, 117, 0, 0.6)", "rgba(255, 117, 0, 0.6)"));

  const angle_increment_parks = 2 * Math.PI / num_parks;

  var result_parks = circleGenerator(raw_data.parks, park_radius, 15, park_color, angle_increment_parks);

  const angle_increment_objects = 2 * Math.PI / num_species;

  var result_species = circleGenerator(raw_data.species, species_radius, 15, species_color, angle_increment_objects);

  var connections = [];

  raw_data.parks.forEach(d => {
    var source = result_parks.coordinates.get(d.name);


    });

  var park_list = result_parks.result;
  var species_list = result_species.result;

  return {
    width,
    height,
    park_list,
    species_list,
    park_radius,
    species_radius
  };
}


function _22(md){return(
md`#### Imports`
)}

function _d3(require){return(
require("d3@5")
)}

function _24(md){return(
md`#### Raw data helper functions`
)}

function _workbook(FileAttachment){return(
FileAttachment("NPSpecies_Checklist_ACAD_20231212211914.xlsx").xlsx()
)}

function _26(workbook){return(
workbook.sheetNames
)}

function _raw(workbook){return(
workbook.sheet(0, {
    headers: true,
    // range: "A1:J10"
  })
)}

function _step1(workbook){return(
workbook.sheet(0, {
    headers: true,
    // range: "A1:J10"
  })
)}

function _step2(workbook){return(
workbook.sheet(0, {
    headers: true,
    // range: "A1:J10"
  })
)}

function _step3(FileAttachment){return(
FileAttachment("reformat.json").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["reformat.json", {url: new URL("./files/0d17767d4d3e297d4f0c98a17ed8e6837322c4d5670e669ef3b712779ccce4581a388ca5891ea935ea4c287e32e0cb886677721d0142ad2e2247a70c01cfc896.json", import.meta.url), mimeType: "application/json", toString}],
    ["bands.json", {url: new URL("./files/9eb8d14b192c7392ab2de044e5120135e6f46f88ac0f2b3a46d06e4387ae2d55f48ee2a2d0e152f6fdc0cde7bf1d60cc3bce47328775c88a727821d5510f7e19.json", import.meta.url), mimeType: "application/json", toString}],
    ["NPSpecies_Checklist_ACAD_20231212211914.xlsx", {url: new URL("./files/b995a53fb252ba4b3c08ae72faf9a01e613da40714e782d118e4d69370aecd1a94cf1a01c8cdc8962864818c7d1998ca91a4de4ad4e200b4d966d85674f20f99.xlsx", import.meta.url), mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["d3","datos"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer()).define(["__query","raw","invalidation"], _7);
  main.variable(observer()).define(["htl"], _8);
  main.variable(observer("data")).define("data", ["__query","step1","invalidation"], _data);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer()).define(["__query","step2","invalidation"], _11);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer()).define(["md"], _15);
  main.variable(observer()).define(["md"], _16);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer("circleGenerator")).define("circleGenerator", ["d3"], _circleGenerator);
  main.variable(observer("datos")).define("datos", ["FileAttachment","d3","circleGenerator"], _datos);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("workbook")).define("workbook", ["FileAttachment"], _workbook);
  main.variable(observer()).define(["workbook"], _26);
  main.variable(observer("raw")).define("raw", ["workbook"], _raw);
  main.variable(observer("step1")).define("step1", ["workbook"], _step1);
  main.variable(observer("step2")).define("step2", ["workbook"], _step2);
  main.variable(observer("step3")).define("step3", ["FileAttachment"], _step3);
  return main;
}
