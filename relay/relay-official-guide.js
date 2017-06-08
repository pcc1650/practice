import React from 'react'
class ProfilePicture extends React.Component {
    render() {
        var user = this.props.user
        var variables = this.props.relay.variables
        return (
            <View>
                <Image uri={user.profilePhoto.uri} width={variables.size} />
                <Slider onChange={value => this.setSize(value)} />
            </View>
        )
    }

    setSize(photoSize) {
        // TODO: Fetch the profile photo uri for the given size...
        this.props.relay.setVariables({
            size: photoSize,
        })
    }
}

export default Relay.createContainer(ProfilePicture, {
    initialVariables: {
        size: 32
    },

    fragments: {
        user: () => Relay.QL`
            fragment on User {
                profilePhoto(size: $size) {
                    uri,
                },
            }
        `,
    },
})


// composition
// compose the view logic
// compose the data descriptions

class Profile extends React.Component {
    render() {
        var user = this.props.user
        return (
           <View>
               <ProfilePicture user={user} />
               <Text>{user.name}</Text>
           </View>
        )
    }
}


export default Relay.createContainer(Profile, {
    fragments: {
        user: () => Relay.QL`
            feagment on User {
                name,
                ${ProfilePicture.getFragment('user')},
            }
        `,
    }
})

// is equivalent to the following
//`
//    fragment Profile on User {
//        name,
//        ...ProfilePhoto,
//    }
//
//    fragment ProfilePhoto on User {
//        profilePhoto(size: $size) {
//            uri,
//        },
//    }
//`


