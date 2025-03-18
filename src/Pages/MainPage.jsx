import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/MainPage.css";
import { CgSearch } from "react-icons/cg";
import { MdSort } from "react-icons/md";

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
  const [sortType, setSortType] = useState("name");
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
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
    sortUsers(temp);
  }, [search, tab, users, sortType]);

  const sortUsers = (list) => {
    if (sortType === "name") {
      list.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (sortType === "birthday") {
      list.sort((a, b) => new Date(a.birthday) - new Date(b.birthday));
    }
    setFilteredUsers([...list]);
  };

  const toggleSortModal = () => {
    setIsSortModalOpen(!isSortModalOpen);
  };

  const changeSortType = (type) => {
    setSortType(type);
    // setIsSortModalOpen(false);
  };

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка загрузки данных</div>;

  let lastYear = null;
  return (
    <div className="container">
      <h1 className="title">Поиск</h1>
      <div className="search-container">
        <CgSearch color="rgb(221, 221, 221)" size={24} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Введи имя, тег..."
          className="search-input"
        />
        <button onClick={toggleSortModal}>
          <MdSort color="rgb(221, 221, 221)" size={24} />
        </button>
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
          filteredUsers.map((user) => {
            const birthYear = new Date(user.birthday).getFullYear();
            const showDivider = sortType === "birthday" && birthYear !== lastYear;
            lastYear = birthYear;
            return (
              <React.Fragment key={user.id}>
                {showDivider && <div className="year-divider">{birthYear}</div>}
                <Link to={`/user/${user.id}`} className="user-item">
                  <img src={user.avatarUrl} alt="avatar" className="user-avatar" />
                  <div className="user-info">
                    <div>
                      <span className="user-name">{user.firstName} {user.lastName}</span>
                      <span className="user-tag"> {user.userTag}</span>
                    </div>
                    <span className="user-department">{user.department}</span>
                  </div>
                </Link>
              </React.Fragment>
            );
          })
        )}
      </div>
      {isSortModalOpen && (
        <div className="sort-modal">
          <h3 className="title">Сортировка</h3>
          <button className="close-button" onClick={toggleSortModal}>×</button>
          <label className="title">
            <input type="radio" checked={sortType === "name"} onChange={() => changeSortType("name")}  /> По алфавиту
          </label>
          <label className="title">
            <input type="radio" checked={sortType === "birthday"} onChange={() => changeSortType("birthday")}/> По дню рождения
          </label>
        </div>
      )}
    </div>
  );
}

export default MainPage;