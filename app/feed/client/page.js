"use client";

import { useState, useEffect } from "react";

const Feed = () => {
    const [data, setData] = useState([])

  useEffect(() => {
fetch('/api/test', {
    cache: 'no-store'
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setData(data)
      });
  }, []);

 

  

  return (
    <section className='feed'>
        <p>
    {data.datetime}
        </p>
    </section>
  );
};

export default Feed;


