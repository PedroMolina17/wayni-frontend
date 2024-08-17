import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Input from "../Components/Input";
import EditModal from "../Components/EditModal";
import PasswordModal from "../Components/PasswordModal";
import Swal from "sweetalert2";
import { fetchUser, updateUser, deleteUser } from "../services/userService";

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
  const [isNumberModalOpen, setIsNumberModalOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetchUser(id);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }

    getUser();
  }, [id]);

  const handleOpenModal = (field) => {
    setFieldValue(user[field]);
    if (field === "name") {
      setIsNameModalOpen(true);
    } else if (field === "username") {
      setIsUsernameModalOpen(true);
    } else if (field === "email") {
      setIsEmailModalOpen(true);
    } else if (field === "phoneNumber") {
      setIsNumberModalOpen(true);
    }
  };

  const handleSave = async (field) => {
    try {
      const updatedUser = { ...user };

      if (field === "password") {
        updatedUser.password = passwordValue;
      } else {
        updatedUser[field] = fieldValue;
      }

      await updateUser(id, updatedUser);

      setUser(updatedUser);

      setIsNameModalOpen(false);
      setIsUsernameModalOpen(false);
      setIsEmailModalOpen(false);
      setIsNumberModalOpen(false);
      setIsPasswordModalOpen(false);

      if (field === "password") {
        setPasswordValue("");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAccount();
      }
    });
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(id);
      Swal.fire("Deleted!", "Your account has been deleted.", "success");
      navigate("/");
    } catch {
      Swal.fire(
        "Error!",
        "There was a problem deleting your account.",
        "error"
      );
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex justify-center items-center h-16 bg-white font-bold text-lg">
        Profile Settings
      </div>
      <div className="flex flex-col gap-4 p-4 pt-20">
        <div>
          <div onClick={() => handleOpenModal("name")}>
            <Input title="Name" data={user.name} />
          </div>
          <div onClick={() => handleOpenModal("username")}>
            <Input title="Username" data={user.username} />
          </div>
          <div onClick={() => handleOpenModal("email")}>
            <Input title="Email" data={user.email} />
          </div>
          <div onClick={() => handleOpenModal("phoneNumber")}>
            <Input title="Phone Number" data={user.phoneNumber} />
          </div>
          <div onClick={() => setIsPasswordModalOpen(true)}>
            <Input title={"Change Password"} />
          </div>
        </div>

        <div onClick={handleDeleteAccount}>
          <Input title={"Delete Account and data"} />
        </div>

        <div onClick={() => setNotification(!notification)}>
          <Input title="Notifications" data={notification ? "On" : "Off"} />
        </div>
      </div>
      <EditModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
        onSave={() => handleSave("name")}
        title="Name"
      />
      <EditModal
        isOpen={isUsernameModalOpen}
        onClose={() => setIsUsernameModalOpen(false)}
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
        onSave={() => handleSave("username")}
        title="User Name"
      />
      <EditModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
        onSave={() => handleSave("email")}
        title="Email"
        inputProps={{ type: "email" }}
      />
      <EditModal
        isOpen={isNumberModalOpen}
        onClose={() => setIsNumberModalOpen(false)}
        value={fieldValue}
        onChange={(e) => setFieldValue(e.target.value)}
        onSave={() => handleSave("phoneNumber")}
        title="Phone Number"
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        data={user.password}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={() => handleSave("password")}
        passwordValue={passwordValue}
        onPasswordChange={(e) => setPasswordValue(e.target.value)}
      />
    </>
  );
};

export default UserDetail;
