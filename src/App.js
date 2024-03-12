import { useState } from "react";
import MusicPlayer from "./MusicPlayer";
import SlideBar from "./SlideBar";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      <div classname="flex-1">
        <SlideBar isSidebarOpen={isSidebarOpen} />
      </div>
      <div className="flex-1">
        <MusicPlayer  toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}/>
        
      </div> 
    </div>
  );
}

export default App;
