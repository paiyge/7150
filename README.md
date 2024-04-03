# Acadia National Park Resident Species

To view the interactive diagram visit: https://observablehq.com/d/c8edef3f33b05e9f@409  
  
This visualization is made of two interactive rings. The outer ring contains mammalian species found in U.S. National Parks. The inner ring has the names of the parks. To use, hover over one of the circles. If you hover over an animal in the outer ring, the corresponding park circles will be emphasized in the inner ring. The same is true for the outer circle if you hover over a park name in the inner circle. Using this graphic, you are able to identify what species are found in which parks and which parks have what species, making it easier to identify animals you might see when visiting.  
![untitled](https://github.com/paiyge/7150/assets/91477408/32ccf1d2-eb87-4561-bd75-7b232b8e11e3)


# CS 7250 Final Project
### What species will you find in each national park?

## Intro
This project involves visualizing the National Parks Service (NPS) Species in National Parks Database, with a focus on creating an intuitive method for identifying species in various parks and illustrating the connectivity between parks based on biodiversity.

There are two main objectives of the visualization:
- Species Identification: Simplify the process of identifying species in different national parks.
- Biodiversity Connectivity: Showcase the interconnectedness of national parks based on shared biodiversity.

The chosen data visualization approach is a circular network encoding, specifically a circular arc diagram. This approach was selected for its unique ability to balance aesthetics and functionality, serving the dual purpose of improved legibility and visual appeal. By using this encoding we are providing:
- Clarity and Distinction: The circular format allows for a clear distinction between parks and species. Each park becomes a distinct segment, and the arcs connecting them represent shared species.
- Readability and Cohesiveness: Circular visualizations often provide better readability compared to linear representations, and the cohesiveness of a circle enhances the viewer's understanding of the overall system.
- Representation of Wholeness: Circles are commonly associated with representing the entirety of something. In this context, the circular format represents the idea of the National Park System as a whole, with each park contributing to the larger ecosystem.
- Ease of Interpretation: Circular arcs facilitate the visualization of connections between parks, offering an intuitive way to understand how biodiversity is shared across different regions.

## Dataset Description
This dataset was created and distributed by the National Parks Service (NPS) which is an agency within the U.S. Department of the Interior. The NPS preserves unimpaired the natural and cultural resources and values of the National Park System for the enjoyment, education, and inspiration of this and future generations.

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

## Design Rationale
There are two main purposes for this visualization that impacted the design decision. 
1. I wanted an easier method for identifying what species could be found in what parks.
2. A way to show how parks are connected by their biodiversity.

There were several iterations of ideas for how to accomplish both of these goals. 

My original idea was the create network graph overlayed onto a map of the United States. Each national park would be rooted to the latitude and longitude proved by NPS using a form of edge bundling. A tooltip would provide information on each animal and park. The added bonus of this idea is the connectivity of the parks is clearer and it gives a visual for how widespread certain species are. I ended up not going with this encoding as  I was unable to get the bundling to work and I find network encodings to be messy and difficult to interact with. 

My second idea was a standard arc encoding to try the more organized version of a network graph. I ran into an issues immediately with the number of species. I felt the distinction between parks and species wasn't clear enough, I didn't like that they were all in the same line. Additionally, the single line was incredibly long which made for it to be unusable. Even if the two categories were separated, somewhat like a sankey, it would still be too long to be legible on many screens. 

The third and final idea was to make the arc diagram into a circle. I was already interested in coercing an encoding into a circle shape after exploring a different dataset all together. I quite like how cohesive and eye catching circular visualizations are. I'm aware that circles tend to be used to represent the whole of something, whether that be percent, time, how much pie you eat on Christmas Eve. However, I think about each park as one piece of the larger parks system and each species as one piece of this country's biodiversity and the circle shape does not seem out of place. The circularity also allowed for me to make the clear distinction between parks and species while still being legible. 

For the interactivity portion I was considering several avenues including tooltips containing information about either the species or the park, an image of the species or the park, a link to an official website with information about the species or the park, and others. I decided the mouseover interaction would be the most aesthetically pleasing after seeing some examples from D3.

## Development Process
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

## Feedback Incorporation: 
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

There were also an interesting idea of incorporating a tooltip that displayed more information about the species. I had also toyed with this idea, as well as including an image of the animal as well as a link to an official site. I placed this idea to the side early on as it seemed too large for the scope of an individual project. I am interested in creating further interactions of this visualization and will consider this idea as well as the critique points I was not able to accomplish during this semester. 

## Final Thoughts

Overall, I am pleased with the outcome of this project. I was not able to enact the entire plan I had for the data, but I have produced a fun, interactive, and eye-catching way to explore something I'm personally interested in. 

Things I have Learned
I was able to learn many new things and improve on old skills during this project. I now have a fair amount of D3 familiarity and have now worked with and created jsons for the first time. I understand better now how different elements of a visualization can either help or hinder a viewers ability to interpret the desired information. Additionally, I was able to explore and consider many new types of encoding and graphic ideas. 

Future Ideas
I have already touched on some things I would do differently in the future design wise, but I think next time I would explore a different aspect of the data. This visualization is heavy on the visual, it is eye-catching and novel and has many avenues to explore at your leisure. Next time, I'm interested in the story telling ability data possesses. Instead of giving the user nearly full access to a dataset, instead walk them through some interesting part that I have uncovered. 
