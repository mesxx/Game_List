import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [input, setInput] = useState({
    id: Math.floor(Math.random() * 100) + 1000,
    title: "",
    thumbnail: "",
    description: "",
    short_description: "",
    publisher: "",
    link: "/",
    release_date: new Date(),
  });
  const [currentId, setCurrentId] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);

  const state = {
    data,
    setData,
    currentId,
    setCurrentId,
    input,
    setInput,
    fetchStatus,
    setFetchStatus,
  };

  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://mmo-games.p.rapidapi.com/games",
      params: { platform: "pc" },
      headers: {
        "X-RapidAPI-Key": "0d5ee77e62mshe7b65350fb23a36p1aef5bjsn74758f060ebf",
        "X-RapidAPI-Host": "mmo-games.p.rapidapi.com",
      },
    };

    axios(options).then((res) => {
      setData(res.data);
    });
  };

  const handleDetail = (e) => {
    const id = e.target.getAttribute("data-id");
    setCurrentId(id);
    navigate(`/game-detail/${id}`);
  };

  const fetchDetail = async () => {
    if (currentId !== null) {
      const options = {
        method: "GET",
        url: "https://mmo-games.p.rapidapi.com/game",
        params: { id: `${currentId}` },
        headers: {
          "X-RapidAPI-Key":
            "0d5ee77e62mshe7b65350fb23a36p1aef5bjsn74758f060ebf",
          "X-RapidAPI-Host": "mmo-games.p.rapidapi.com",
        },
      };

      axios(options).then((res) => {
        setData(res.data);
      });
    }
  };

  const handleForm = (e) => {
    navigate(`/game-add`);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setInput({ ...input, [name]: type === "file" ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    data.push(input);
    navigate("/game-list");

    setInput({
      id: Math.floor(Math.random() * 100) + 1000,
      title: "",
      thumbnail: "",
      description: "",
      short_description: "",
      publisher: "",
      link: "/",
      release_date: new Date(),
    });
  };

  const handleFunction = {
    fetchData,
    handleDetail,
    fetchDetail,
    handleChange,
    handleForm,
    handleSubmit,
  };

  return (
    <GlobalContext.Provider value={{ state, handleFunction }}>
      {children}
    </GlobalContext.Provider>
  );
};
