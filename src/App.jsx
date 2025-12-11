import { useState } from 'react'
import './App.css'

function App() {

  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    if (!username) {
      alert("Please Enter Your Username");
      return;
    }

    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error("Invalid fetching of data , something went wrong");
      }
      let data = await response.json();
      console.log(data);

      if (data.message === "Not Found") {
        setError("User Not Found");
        setUserData(null);
        return;
      }

      setUserData(data);
      setError("");
    } catch (error) {
      setError("Error fetching user");
    }

    setUsername("");
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") fetchUser();
  }

  return (
    <>
      <div className="github-profile-finder section-padding">
        <div className="github-profile__inner">
          <div className="github-profile--heading text-center">
            <h4 className='uppercase text-[1.4rem] tracking-wide font-[500] mb-8'>github profile finder</h4>
          </div>
          <div className="github-finder--content">
            <div className="max-w-xl mx-auto flex gap-3">
              <input
                type="text"
                placeholder="Enter GitHub username"
                className="flex-1 px-4 py-3 rounded-md bg-gray-800 border border-gray-600 outline-none"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                onClick={fetchUser}
                className="px-5 py-3 bg-slate-600 rounded-md hover:bg-slate-700 transition"
              >
                Search
              </button>
            </div>
            {error && (
              <p className="text-center text-red-400 mt-4 text-lg">{error}</p>
            )}
            {userData && (
              <div className="max-w-xl mx-auto mt-10 bg-gray-800 p-6 rounded-xl shadow-lg">
                <div className="flex flex-col items-center">
                  <img
                    src={userData.avatar_url}
                    alt="avatar"
                    className="w-32 h-32 rounded-full border-4 border-gray-500"
                  />
                  <h2 className="text-2xl font-semibold mt-4">
                    {userData.name || "No Name"}
                  </h2>
                  <p className="text-gray-300">@{userData.login}</p>
                  {userData.bio && (
                    <p className="text-center text-gray-400 mt-3">{userData.bio}</p>
                  )}
                </div>
                <div className="grid grid-cols-3 text-center bg-gray-700 p-4 rounded-lg mt-6">
                  <div>
                    <h3 className="text-xl font-bold">{userData.followers}</h3>
                    <p className="text-gray-300">Followers</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{userData.following}</h3>
                    <p className="text-gray-300">Following</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{userData.public_repos}</h3>
                    <p className="text-gray-300">Repos</p>
                  </div>
                </div>
                <div className="mt-6 space-y-2">
                  <p>📍 Location:  {userData.location || "Not available"}</p>
                  <p>
                    📅 Joined:{" "}
                    {new Date(userData.created_at).toLocaleDateString("en-IN")}
                  </p>
                </div>
                <a
                  href={userData.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="block mt-6 bg-slate-600 text-center py-3 rounded-md hover:bg-slate-700 transition"
                >
                  Visit GitHub Profile
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
