import Login from "./pages/login.vue";
import ChangeProfile from "./pages/change-profile.vue";
import NotFound from "./pages/not-found.vue";
import JoinGame from "./pages/join-gamer.vue";
import MainJoin from "./pages/main-page.vue";
import JoinedList from "./pages/joined-list.vue";
import Question from "./pages/question.vue";
import ResponseStatus from "./pages/response-status";
import WaitingForAnswer from "./pages/waiting-for-answer";
import ApprobateQuestion from "./pages/approbate-question.vue";
import ScoreList from "./pages/score-table.vue";
import Winner from "./pages/winner.vue";

export default[
    {
        path: '/make-game',
        meta:{layout:'initial'},
        component: Login
    },
    {
        path: '/join',
        meta:{layout:'initial'},
        component: JoinGame
    },
    {
        path: '/joined-list',
        meta:{layout:'initial'},
        component: JoinedList
    },
    {
        path: '/',
        meta:{layout:'initial'},
        component: MainJoin
    },
    {
        path:'/change-profile',
        name:'change-profile',
        component:ChangeProfile
    },
    {
        path:'/question',
        meta:{layout:'initial'},
        name:'question',
        component: Question
    },
    {
        path:'/waiting-for-answer',
        meta:{layout:'initial'},
        component: WaitingForAnswer
    },
    {
        path:'/approbate-question',
        meta:{layout:'initial'},
        component: ApprobateQuestion
    },
    {
        path:'/response-status',
        meta:{layout:'initial'},
        component: ResponseStatus
    },
    {
        path:'/score-table',
        meta:{layout:'initial'},
        component: ScoreList
    },
    {
        path:'/winner',
        meta:{layout:'initial'},
        component: Winner
    },
    {
        // path:'/start/:game',
        path:'/start',
        component: JoinGame,
        meta:{
            layout: 'initial'
        }
    },
    {
        path: '*',
        name: 'not-found',
        component: NotFound,
    }
]