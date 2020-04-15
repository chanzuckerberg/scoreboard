export const RECEIVE_CHALLENGES = "RECEIVE_CHALLENGES";
export const RECEIVE_CHALLENGE = "RECEIVE_CHALLENGE";
export const RECEIVE_SUBMISSIONS = "RECEIVE_SUBMISSIONS";
export const RECEIVE_DATASETS = "RECEIVE_DATASETS";
export const LOGOUT = "LOGOUT";
export const SORT_ALGORTIHMS = "SORT_ALGORTIHMS";
export const TOGGLE_ALOGRITHM_ACTIVATION = "TOGGLE_ALOGRITHM_ACTIVATION";
export const ADMIN_APPROVE_ALOGRITHM = "ADMIN_APPROVE_ALOGRITHM";
export const RECIEVE_USER = "RECIEVE_USER";
export const NODE = "NODE";

const challenges_url = "/api/challenges";
const challenge_url = "/api/challenge";
const submissions_url = "/api/submissions";
const ghuser_url = "/api/ghuser";
const dataset_url = "/api/datasets";
const approve_url = "/api/approve";
const logout_url = "/auth/logout";

// Get all challenges for homepage

const receiveChallenges = (json) => ({
  type: RECEIVE_CHALLENGES,
  challenges: json.data,
  receivedAt: Date.now(),
});

export const initializeHomepage = () => {
  return (dispatch) => {
    return Promise.all([dispatch(fetchUser()), dispatch(fetchChallenges())]);
  };
};

export const fetchChallenges = () => {
  return (dispatch) => {
    return fetch(challenges_url)
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveChallenges(json));
      });
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    return fetch(ghuser_url, { credentials: "same-origin" })
      .then((response) => {
        if (response.status >= 400 && response.status < 600) {
          throw new Error("No user");
        }
        return response.json();
      })
      .then((json) => {
        if (!"data" in json) {
          throw new Error("No user");
        }
        dispatch(recieveUser(json));
      })
      .catch(() => {
        console.log("No user logged in");
      });
  };
};

const recieveUser = (user) => ({
  type: RECIEVE_USER,
  receivedAt: Date.now(),
  user,
});

export const logout = () => {
  return (dispatch) => {
    return fetch(logout_url)
      .then((response) => response.json())
      .then((json) => {
        dispatch(serverLogout());
      });
  };
};
const serverLogout = () => ({
  type: LOGOUT,
});

const receiveSubmissions = (json) => ({
  type: RECEIVE_SUBMISSIONS,
  submissions: json.data,
  receivedAt: Date.now(),
});

export const fetchSubmissions = (challenge_id) => {
  return (dispatch) => {
    return fetch(`${submissions_url}/${challenge_id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveSubmissions(json));
      });
  };
};

const receiveDatasets = (json) => ({
  type: RECEIVE_DATASETS,
  datasets: json.data,
  receivedAt: Date.now(),
});

export const fetchDatasets = (challenge_id) => {
  return (dispatch) => {
    return fetch(`${dataset_url}/${challenge_id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveDatasets(json));
      });
  };
};

const receiveChallengeInfo = (json) => ({
  type: RECEIVE_CHALLENGE,
  challenge: json.data,
  receivedAt: Date.now(),
});

export const node = (_the_node) => ({
  type: NODE,
  node: _the_node,
});

export const fetchChallengeInfo = (challenge_id) => {
  return (dispatch) => {
    return fetch(`${challenge_url}/${challenge_id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch(receiveChallengeInfo(json));
      });
  };
};

export const fetchOneChallenge = (challenge_id) => {
  return (dispatch) => {
    return Promise.all([
      dispatch(fetchSubmissions(challenge_id)),
      dispatch(fetchDatasets(challenge_id)),
      dispatch(fetchChallengeInfo(challenge_id)),
      dispatch(fetchUser()),
    ]);
  };
};

export const sortAlgorithms = (attr, idx) => {
  return {
    type: SORT_ALGORTIHMS,
    sortBy: attr,
    dataIdx: idx,
  };
};

export const toggleAlgortirhmActivation = (algorithmID) => {
  return {
    type: TOGGLE_ALOGRITHM_ACTIVATION,
    algorithmID: algorithmID,
  };
};

export const approveOrRejectSubmission = (
  submissionid,
  approved,
  challengeid
) => {
  return (dispatch) => {
    const approvedBool = approved === "true";
    fetch(approve_url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ submissionid, approved: approvedBool }),
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        console.log(challengeid);
        dispatch(fetchOneChallenge(challengeid));
      })
      .catch((err) => {
        // TODO have an actual error behavior here

        console.log("Error", err);
      });
  };
};
