import React, { useState, useEffect } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [flag, setFlag] = useState("");
  const [error, setError] = useState(null);

  const fetchFlag = async () => {
    try {
      const url = "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/696d70";
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.text();
        typeFlag(data);
      } else {
        setError(new Error(`Failed to fetch flag. Status: ${response.status}`));
      }
    } catch (err) {
      setError(err);
    }
  };

  const typeFlag = (data) => {
    [...data].forEach((letter, index) => {
      setTimeout(() => {
        setIsLoading(false);
        setFlag((prevText) => {
          if (prevText.length === index) {
            return [...prevText, letter];
          }
          return prevText;
        });
      }, 500 * index);
    });
  };

  useEffect(() => {
    fetchFlag();
  }, []);

  if (error) {
    const errorMessage = <div>{error.message}</div>;
    setIsLoading(false);
    return errorMessage;
  }

  if (isLoading) {
    const loadingMessage = <div>Loading...</div>;
    return loadingMessage;
  }

  return (
    <div className="App">
      <ul className="flag">{flag}</ul>
    </div>
  );
}

export default App;

// Bonus: Add as a comment the script you used to to get the URL in step 2

// const nodes = [...document.querySelectorAll('code[data-class^="23"] [data-tag*="93"] [data-id*="21"] > i.char')];

// const url = nodes.map(node => node.getAttribute('value')).join('');

// console.log(url);
