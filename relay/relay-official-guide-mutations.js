// Mutations - operations that consist of writes to the data store followed by a fetch of any changed fields.

class LikeStoryMutation extends Relay.Mutation {
    // This presumes that the server implements a mutation type named 'likeStory'
    getMutation() {
        return Relay.QL`mutation {likeStory}`
    }
    getVariables() {
        return {storyID: this.props.story.id}
    }
    getFatQuery() {
        return Relay.QL`
            fragment on LikeStoryPayload {
                story {
                    likers {
                        count,
                    },
                    likeSentence,
                    viewerDoesLike,
                },
            }
        `
    }
    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                story: this.props.story.id,
            },
        }]
    }
    static fragments = {
        story: () => Relay.QL`
            fragment on Story {
                id,
            }
        `,
    }
}

class LikeButton extends React.Component {
    _handleLike = () => {
        // this.props.relay.commitUpdate 
        // The commitUpdate method is analogous to dispatching an action in Flux.
        this.props.relay.commitUpdate(
            new LikeStoryMutation({story: this.props.story})
        )
    }

    render() {
        return (
            <div>
                {this.props.story.viewerDoesLike 
                    ? 'You like this'
                    : <button onClick={this._handleLike}> Like this </button>
                }
            </div>
        )
    }
}
    
export default Relay.createContainer(LikeButton, {
    fragments: {
        story: () => Relay.QL`
            fragment on Story {
                viewerDoesLike,
                ${LikeStoryMutation.getFragment('story')}
            }
        `,
    }
})


// Mutation props
class LikeStoryMutation extends Relay.Mutation {
    static fragments = {
        story: () => Relay.QL`
            fragment on Story {
                id,
                viewerDoesLike,
            }
        `,
    }
    getMutation() {
        // Here, viewerDoesLike is guaranteed to be available.
        // We can use it to make this mutation polymorphic.
        return this.props.stroy.viewerDoesLike
        ? Relay.QL`mutation {unlikeStory}`
        : Relay.QL`mutation {likeStory}`
    }
    /* ... */
}

// Fragment variables ?

// Changing one thing in a system can have a ripple effect that causes other things to change in turn.
// Design a fat query that covers every possible field that could change.
class AcceptFriendReuqestMutation extends Relay.Mutation {
    getFatQuery() {
        // This presumes that the server-side implementation of this mutation
        // returns a payload of type 'AcceptFriendRequestPayload' that exposes
        // 'friendEdge', 'friendRequester', and 'viewer' fields.
        // Anything under those non-scalar fields like friendEdge and friends may change as a result of this mutation
        // Consider all of the data that might change as a result of the mutation - not just the data currently in use by your application.
        // Do not need to worry about overfetching. 
        // This query is never executed without first intersecting it with a 'tracked query' of the data our application actually needs ???
        return Relay.QL`
            fragment on AcceptFriendRequestPayload {
                friendEdge,
                friendRequester {
                    friends,
                    friendshipStatusWithViewer,
                },
                viewer {
                    friends,
                },
            }
        `;
    }
}

// Mutator configuration ???
// We need to give Relay instructions on how to use the response payload from each mutation to update the client-side store.
// We do this by configuring the mutation types
// FIRLDS_CHANGE, NODE_DELETE, RANGE_ADD, RANGE_DELETE, REQUIRED_CHILDREN  



