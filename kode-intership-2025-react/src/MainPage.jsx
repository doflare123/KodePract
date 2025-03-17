import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MainPage.css";
import { CgSearch } from "react-icons/cg";

const API_URL = "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users";
const departments = [
  { key: "all", label: "Все" },
  { key: "Designers", label: "Designers" },
  { key: "Analysts", label: "Analysts" },
  { key: "Managers", label: "Managers" },
  { key: "ios", label: "iOS" },
  { key: "android", label: "Android" },
];

function MainPage() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}?__example=all`)
      .then((res) => {
        setUsers(res.data.items);
        setFilteredUsers(res.data.items);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let temp = [...users];
    if (tab !== "all") {
      temp = temp.filter((u) => u.department.toLowerCase() === tab);
    }
    if (search) {
      temp = temp.filter(
        (u) =>
          u.firstName.toLowerCase().includes(search.toLowerCase()) ||
          u.lastName.toLowerCase().includes(search.toLowerCase()) ||
          u.userTag.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredUsers(temp);
  }, [search, tab, users]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка загрузки данных</div>;

  return (
    <div className="container">
      <h1 className="title">Поиск</h1>
      <div className="search-container">
        <CgSearch color="rgb(221, 221, 221)" size={24}/>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Введи имя, тег, почту..."
          className="search-input"
        />
      </div>
      <div className="tabs">
        {departments.map((d) => (
          <button
            key={d.key}
            className={`tab ${tab === d.key ? "active" : ""}`}
            onClick={() => setTab(d.key)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <div className="no-results">Ничего не найдено</div>
        ) : (
          filteredUsers.map((user) => (
            <Link to={`/user/${user.id}`} key={user.id} className="user-item">
             <img src={user.avatarUrl} alt="avatar" className="user-avatar" />
              <div className="user-info">
                <div>
                  <span className="user-name">{user.firstName} {user.lastName}</span>
                  <span className="user-tag"> {user.userTag}</span>
                </div>
                <span className="user-department">{user.department}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );}

export default MainPage;
