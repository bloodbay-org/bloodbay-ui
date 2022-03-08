import React from "react";
import {Avatar, Card, Comment, Timeline, Typography} from "antd";

const {Title, Paragraph, Text, Link} = Typography;

export function About() {

    return (
        <div>
            <Card>
                <Comment
                    author={<a>Nick</a>}
                    avatar={<Avatar
                        src="https://www.gravatar.com/avatar/23e01f03b74e0277b6166832f36df3ec?s=250&d=mm&r=x"
                        alt="Nick"/>}
                    content={
                        <Paragraph>
                            This project has been created to support people who suffered adverse reactions to vaccines
                            and are being ignored by doctors.
                            Systems like VAERS do not provide sufficient data about side-effects and just serve as a
                            context-less platform for governments.
                            BloodBay was created as an attempt to allow people to record their struggles and share
                            evidences such as blood tests or other results.
                            BloodBay has been built completely from scratch and doesn't depend on any major services
                            which may disrupt its functionality.
                            And even if it happens, it will be very easy to set this project back to life.
                            As of now it is in very early stage since the core version has been built in about a week
                            when I had time after work or during weekends.
                            If you know how to code and would like to improve the project/reduce bugs - feel free to
                            submit your merge requests.
                            I'm aware that many things currently can be quite quite unstable, but I decided to release
                            this platform to the public early to make sure community will voice out what are the most
                            desirable features for this project.
                            (Maybe what I have in my mind is different from what people need, who knows?)
                        </Paragraph>
                    }
                />
            </Card>
        </div>
    );
}
