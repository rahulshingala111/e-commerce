import React, { useEffect, useState } from 'react'
import './Profile.css'
import ApiCall from '../../../../constants/ApiCall';
import CONSTANTS from '../../../../constants/constants';

interface UserDataInterface {
    first_name: string,
    last_name: string,
    email: string,
    mobile_no: string
}

const Profile: React.FC = () => {

    const [userData, setUserData] = useState<UserDataInterface>()

    const [isEditing, setIsEditing] = useState<boolean>(false)




    useEffect(() => {
        console.log('//');

        callapi()

    }, [])

    const callapi = async () => {
        try {
            const getUser = await ApiCall.get(CONSTANTS.API_ENDPOINTS.USER.USER_DETAILS)
            if (getUser.status) {
                setUserData(getUser.data)
            } else {
                console.log('something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className="profile-personal-info__header">
                <h3>Personal Information</h3>
                {!isEditing && (
                    <div
                        className="profile-personal-info__edit-button" onClick={() => setIsEditing(true)}>
                        Edit
                    </div>
                )}
                {isEditing && (
                    <div
                        className="profile-personal-info__save-button" onClick={() => setIsEditing(false)}>
                        Save
                    </div>
                )}
            </div>
            {
                userData && (
                    <div>
                        <div className="profile-personal-info__field">
                            <span className="profile-personal-info__field-label">First Name:</span>
                            <input
                                type="text"
                                defaultValue={userData.first_name}
                                className={`profile-personal-info__field-input ${isEditing ? 'profile-personal-info__field-input--editable' : ''
                                    }`}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="profile-personal-info__field">
                            <span className="profile-personal-info__field-label">Last Name:</span>
                            <input
                                type="text"
                                defaultValue={userData.last_name}
                                className={`profile-personal-info__field-input ${isEditing ? 'profile-personal-info__field-input--editable' : ''
                                    }`}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="profile-personal-info__field">
                            <span className="profile-personal-info__field-label">Email:</span>
                            <div>
                                <input
                                    type="email"
                                    defaultValue={userData.email}
                                    className={`profile-personal-info__field-input`}
                                    disabled={true}
                                />
                                <span className="profile-personal-info__email-verification">
                                    Not verified
                                </span>
                            </div>
                        </div>
                        <div className="profile-personal-info__field">
                            <span className="profile-personal-info__field-label">Mobile:</span>
                            <input
                                type="tel"
                                defaultValue={userData.mobile_no}
                                className={`profile-personal-info__field-input ${isEditing ? 'profile-personal-info__field-input--editable' : ''
                                    }`}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>
                )
            }
        </div >

    )
}
export default Profile 