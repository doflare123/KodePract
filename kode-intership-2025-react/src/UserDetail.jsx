import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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
  
    return (
      <div className="user-detail">
        <button onClick={() => navigate(-1)} className="back-button">Назад</button>
        <img src={user.avatarUrl} alt="avatar" className="user-avatar-large" />
        <h1 className="user-name-large">
          {user.firstName} {user.lastName} <span className="user-tag">{user.userTag}</span>
        </h1>
        <p className="user-department">{user.department}</p>
        <p>День рождения: {user.birthday}</p>
        <a href={`tel:${user.phone}`} className="user-phone">{user.phone}</a>
      </div>
    );
  }

  export default UserDetail;