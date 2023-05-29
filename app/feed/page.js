"use client";

import PromptCard from "@components/PromptCard";
import { useState, useEffect } from "react";


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-8 prompt_layout'>
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setLoading] = useState(false);


  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

//   const fetchPosts = async () => {
//     const response = await fetch("/api/prompt", {
//       cache: 'no-store',
//     });
//     const data = await response.json();
//     setAllPosts(data);
//   };

//   useEffect(() => {
//     // fetchPosts();

//   }, []);

  useEffect(() => {
    setLoading(true);
    fetch('/api/prompt', {
        cache: 'no-cache'
    })
      .then((res) => res.json())
      .then((data) => {
        setAllPosts(data);
        setLoading(false);
        console.log(data)
      });
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a prompt'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <div className="mt-4">
        <h1 className='head_text text-center'>
          Discover & Share
          <br className='max-md:hidden' />
          <span className='blue_gradient text-center'> AI-Powered Prompts</span>
        </h1>
        <p className='desc text-center'>
          Promptify is an AI prompting tool for modern world to
          discover, create, optimize and share creative prompts
        </p>
      </div>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;


