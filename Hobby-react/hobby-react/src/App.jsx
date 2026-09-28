import HobbyCard from "./HobbyCard";

function App() {
  const hobbies = [
    {
      image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
      name: "Reading",
      description: "I enjoy reading books because it helps me gain knowledge and relax."
    },
    {
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742",
      name: "Photography",
      description: "Photography allows me to capture beautiful moments and memories."
    },
    {
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
      name: "Cooking",
      description: "I love cooking different dishes and trying new recipes."
    },
    {
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      name: "Fitness",
      description: "Fitness keeps me active, healthy, and energetic throughout the day."
    },
    {
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
      name: "Music",
      description: "Listening to music helps me feel relaxed and improves my mood."
    },
    {
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      name: "Travelling",
      description: "Travelling gives me an opportunity to explore new places and cultures."
    }
  ];

  return (
    <div className="container">
      <h1>My Hobbies</h1>

      <div className="hobby-container">
        {hobbies.map((hobby, index) => (
          <HobbyCard
            key={index}
            image={hobby.image}
            name={hobby.name}
            description={hobby.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;