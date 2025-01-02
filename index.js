import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 4000;

// In-memory data store
let posts = [
  {
    id: 1,
    title: "The Rise of Artificial Intelligence: Transforming Industries",
    content: "Artificial Intelligence (AI) has revolutionized industries globally, from healthcare to transportation. Technologies like machine learning, natural language processing, and neural networks have enabled AI to perform tasks with unprecedented efficiency. In healthcare, AI-powered diagnostics outperform traditional methods, while autonomous vehicles are reshaping urban mobility. The ethical implications of AI, such as data privacy and job displacement, are also gaining attention, making responsible AI development critical for long-term sustainability.",
    author: "Russell, Stuart, and Norvig, Peter",
    date: "2020-08-01T10:00:00Z",
  },
  {
    id: 2,
    title: "Robotics: The Future of Automation",
    content: "Robotics is driving the fourth industrial revolution, integrating AI to create smart, autonomous systems. Modern robots perform complex tasks, from assembly lines to surgical procedures. Advances in robotics, like soft robotics and bio-inspired designs, are enabling robots to navigate unstructured environments. The rise of collaborative robots (cobots) enhances human-robot teamwork in various sectors, ensuring safety and productivity. Challenges remain in affordability, reliability, and ethical concerns surrounding human dependence on robotic systems.",
    author: "Siciliano, Bruno, and Khatib, Oussama",
    date: "2016-08-05T14:30:00Z",
  },
  {
    id: 3,
    title: "AI and Robotics: Shaping the Future Workforce",
    content:
      "AI and robotics are transforming the job market, automating repetitive tasks while creating opportunities in AI development, data science, and robot maintenance. Education systems must adapt by promoting STEM education and soft skills like creativity and emotional intelligence. The shift requires proactive strategies to minimize societal impacts, such as upskilling programs and AI policy frameworks to address economic disparities.",
    author: "Brynjolfsson, Erik, and McAfee, Andrew",
    date: "2014-08-10T09:15:00Z",
  },
  { 
    id : 4,
    title: "Robotics in Space Exploration",
    content: "Robots play a crucial role in space exploration, conducting missions too dangerous or distant for humans. Rovers like Curiosity and Perseverance have explored Mars, collecting data and samples for scientific analysis. Autonomous drones assist in mapping and monitoring celestial bodies, while robotic arms perform delicate tasks on spacecraft. The future of space robotics includes AI-driven systems for asteroid mining, lunar habitats, and interplanetary missions, expanding humanity's reach into the cosmos.",
    author: "European Space Agency (ESA)",
    date: "2023-10-10T09:15:00Z",
  }
];


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 1: GET All posts
app.get("/posts",(req,res)=>{
  res.json(posts)
});

// 2: GET a specific post by id
app.get("/posts/:id",(req,res)=>{
  const a = parseInt(req.params.id);
  const b = posts.find((p)=>p.id===a);
  if (!b){
    res.status(404).json({message:"Post not found"});
  }
  res.json(b);
})

// 3: POST a new post
app.post("/posts",(req,res)=>{
  const newId = (posts.length) + 1;
  const newPost = {
  id : newId,
  title : req.body.title,
  content : req.body.content,
  author : req.body.author,
  date : new Date()
};
  posts.push(newPost);
  res.json(newPost);
});

// 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id",(req,res)=>{
  const c = parseInt(req.params.id);
  const d = posts.find((p)=>p.id===c);
  const e = {
    id : c,
    title : req.body.title || d.title,
    content : req.body.content || d.content,
    author : req.body.author || d.author,
    date : req.body.date || d.date
  };
  posts[posts.indexOf(d)] = e;
  res.json(e);
})

// 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id",(req,res)=>{ 
  const f = parseInt(req.params.id);
  const g = posts.find((p)=>p.id===f);
  const h = posts.indexOf(g);
  posts.splice(h,1);
  res.json({ message: "Post deleted" });
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
