import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/UserDetail.css";
import { FaPhoneAlt } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { IoChevronBack } from "react-icons/io5";

const API_URL = "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}?__example=all`).then((res) => {
      const found = res.data.items.find((u) => u.id === id);
      setUser(found);
    });
  }, [id]);

  if (!user) return <div className="loading">Загрузка...</div>;

  // Функция для форматирования даты рождения
  const formatDate = (dateStr) => {
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    const date = new Date(dateStr);
    console.log(`${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`)
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Функция для расчета возраста
  const getAge = (dateStr) => {
    const birthDate = new Date(dateStr);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (today.getMonth() < birthDate.getMonth() || 
       (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  // Функция для форматирования номера телефона
  const formatPhone = (phone) => {
    return phone.replace(/\+7(\d{3})(\d{3})(\d{2})(\d{2})/, "+7 ($1) $2 $3 $4");
  };

  return (
    <div className="container">
      <div className="user-detail">
        <button onClick={() => navigate(-1)} className="back-button"><IoChevronBack size={30}/></button>
        <img src={user.avatarUrl} alt="avatar" className="user-avatar-large" />
        <h1 className="user-name-large">
          {user.firstName} {user.lastName} <span className="user-tag">{user.userTag}</span>
        </h1>
        <p className="user-department">{user.department}</p>
      </div>
      <div className="user-detail2">
        <div className="user-info-row">
          <CiStar color="rgb(221, 221, 221)" size={30}/>
          <span className="birthday">{formatDate(user.birthday)}</span>
          <span className="age">{getAge(user.birthday)} года</span>
        </div>
        <div className="">
        <FaPhoneAlt color="rgb(221, 221, 221)" size={20}/>
          <a href={`tel:${user.phone}`} className="user-phone">{formatPhone(user.phone)}</a>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;