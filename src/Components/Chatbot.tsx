import * as React from 'react';
import ChatBot from 'react-simple-chatbot';

class Chatbot extends React.Component {

    public render() {

        const why = 'Why was this application created and for what purpose?'
        const howCreate = 'How do I create my own post?'
        const howDelete = 'How do I delete a post I created?'
        const howEdit = 'How do I edit a post I created?'
        const howSearch = 'How do I search for posts?'

        return (

            <ChatBot
                floating={true}
                headerTitle={'ChitChat Help Bot'}
                placeholder={'Select from the options above'}
                style={{ fontFamily: 'Arial' }}
                steps={[
                    {
                        id: '1',
                        message: 'What do you need help with?',
                        trigger: '2',
                    },
                    {
                        id: '2',
                        options: [
                            { value: 1, label: why, trigger: '3' },
                            { value: 2, label: howCreate, trigger: '4' },
                            { value: 3, label: howDelete, trigger: '5' },
                            { value: 4, label: howEdit, trigger: '6' },
                            { value: 5, label: howSearch, trigger: '7' },
                        ],
                    },
                    {
                        id: '3',
                        message: 'This is application was used as a submission for a project, for Microsoft Student Accelerator Phase 2 in 2018.'
                        + ' This application is made for socialising and exploring the topics and current news around you.',
                        trigger: '1',
                    },
                    {
                        id: '4',
                        message: 'To create your own post make sure you log in with a valid username. Then click on the profile tab which will'
                        + ' take you to your posts you have created and a section to create your own posts. Type in a title and the post details '
                        + 'then press submit.',
                        trigger: '1',
                    },
                    {
                        id: '5',
                        message: 'To delete a post, make sure you have logged on using the same name you created the post with. Then go to profile,'
                        +' and search for your post. Once you have found your post, click the delete icon next to the title of the post.',
                        trigger: '1',
                    },
                    {
                        id: '6',
                        message:'To edit a post, make sure you have logged on using the same name you created the post with. Then go to profile,'
                        +' and search for your post. Once you have found your post, click the edit icon next to the title of the post.' 
                        +' A menu should pop up and you can enter the new title and post information. Press save to change.',
                        trigger: '1',
                    },
                    {
                        id: '7',
                        message: 'To search for a post, go on to the feed, and then type in the words in the big text field. Then click search and '
                        +' and certain posts with detials that are the same as the words you have typed will appear.',
                        trigger: '1',
                    },
                ]}
            />

        );
    }
}

export default Chatbot;