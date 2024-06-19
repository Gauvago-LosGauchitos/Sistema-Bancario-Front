import './Perfil.css';
import { NavBar } from '../Navbar/Navbar.jsx';
import { Footer } from '../Footer/Footer.jsx';
import { useEffect, useState } from 'react';
import { useUser } from '../../shared/hooks/useUser.jsx';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import profileDefault from '../../assets/img/defaultUser.png';
import { useNavigate } from 'react-router-dom';

export const Perfil = () => {
  const { loading, handleUploadImage, handleUpdateUser, handleDeleteUser, error, user } = useUser();
  const [editMode, setEditMode] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    DPI: '',
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userLogged) {
      setUserData({
        name: user.userLogged.name || '',
        DPI: user.userLogged.DPI || '',
        username: user.userLogged.username || '',
        email: user.userLogged.email || '',
        oldPassword: '',
        newPassword: '',
      });
    }
  }, [user]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleUpdateUser(userData);
      toast.success('Profile updated successfully');
      setEditMode(false);
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating profile:', error);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    if (user && user.userLogged) {
      setUserData({
        name: user.userLogged.name || '',
        DPI: user.userLogged.DPI || '',
        username: user.userLogged.username || '',
        email: user.userLogged.email || '',
        oldPassword: '',
        newPassword: '',
      });
    }
  };

  const handleDelete = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      customClass: {
        confirmButton: 'swal2-confirm',
        cancelButton: 'swal2-cancel'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await handleDeleteUser('yes');
          Swal.fire('Deleted!', 'Your account has been deleted.', 'success');
          navigate('/register');
        } catch (error) {
          Swal.fire('Error!', 'There was an issue deleting your account.', 'error');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your account is safe :)', 'error');
      }
    });
  };

  const handleImageChange = async (event) => {
    const imageFile = event.target.files[0];
    const formData = new FormData();
    formData.append('image', imageFile);

    const { value: confirmUpload } = await Swal.fire({
      title: 'Confirm upload',
      text: 'Are you sure you want to upload this image?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, upload it!'
    });

    if (confirmUpload) {
      try {
        await handleUploadImage(formData);
        toast.success('Your profile picture has been uploaded successfully!');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        toast.error('An error occurred while uploading your profile picture. Please try again later.');
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className='page-container'>
        <div className='image-background'>
          <div className='container-general'>
            <div className="gradiant"></div>
            {!loading && user && user.userLogged && (
              <div className='container-profile'>
                <div className='card'>
                  <div className='card__img'>
                    <div className='card__avatar'>
                      <img src={user.userLogged.imgProfile || profileDefault} alt='avatar' />
                    </div>
                  </div>
                  <div className='card__title'>{user.userLogged.username}</div>
                  <div className='card__subtitle'>{user.userLogged.email}</div>
                  <div className="card__wrapper">
                    <button className="card__btn" onClick={handleEdit}>Edit</button>
                    <button className="card__btn card__btn-solid" onClick={handleDelete}>Delete</button>
                    {editMode && (
                      <>
                        <label>
                          <span>Old Password</span>
                          <input
                            className="input"
                            type="password"
                            name="oldPassword"
                            value={userData.oldPassword}
                            onChange={handleInputChange}
                          />
                        </label>
                        <span>New Password</span>
                        <label>
                          <input
                            className="input"
                            type="password"
                            name="newPassword"
                            value={userData.newPassword}
                            onChange={handleInputChange}
                          />
                        </label>
                        <div className="form__actions">
                          <button type="submit" className="btn" onClick={handleSubmit}>Save</button>
                          <button type="button" className="btn" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <form className='form' onSubmit={handleSubmit}>
                  <p className='title'>Informacion</p>
                  <label>
                    <span>Name</span>
                    <input
                      className="input"
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      required
                      disabled={!editMode}
                    />
                  </label>
                  <span>DPI</span>
                  <label>
                    <input
                      className="input"
                      type="text"
                      name="DPI"
                      value={userData.DPI}
                      onChange={handleInputChange}
                      required
                      disabled={!editMode}
                    />
                  </label>
                  <span>Username</span>
                  <label>
                    <input
                      className="input"
                      type="text"
                      name="username"
                      value={userData.username}
                      onChange={handleInputChange}
                      required
                      disabled={!editMode}
                    />
                  </label>
                  <span>Email</span>
                  <label>
                    <input
                      className="input"
                      type="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      required
                      disabled={!editMode}
                    />
                  </label>
                  <label>
                    <input className="input" type="file" accept="image/*" name="image" onChange={handleImageChange} />
                  </label>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
