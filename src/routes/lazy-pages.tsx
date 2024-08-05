import { lazy } from "react"

const HomePage = lazy(() => import("../pages/home-page"))
const TipsPage = lazy(() => import("../pages/tips-page"))
const SubsPage = lazy(() => import("../pages/subs-page"))
const AllPosts = lazy(() => import("../pages/all-posts"))
const UsersPage = lazy(() => import("../pages/users-page"))
const StorePage = lazy(() => import("../pages/store-page"))
const LoginPage = lazy(() => import("../pages//login-page"))
const PartnersPage = lazy(() => import("../pages/partners-page"))
const SchedulePostsPage = lazy(() => import("../pages/schedule-post-page"))
const AddPostPage = lazy(() => import("../pages/add-post-page/add-post-page"))
const AddTipsPage = lazy(() => import("../pages/add-post-page/add-tips-page"))
const ClassifiedPostsPage = lazy(() => import("../pages/classified-posts-page"))
const SelectPostType = lazy(() => import("../pages/add-post-page/select-post-type"))
const AddPartnersPage = lazy(() => import("../pages/add-post-page/add-partners-page"))
const AddSchedulePage = lazy(() => import("../pages/add-post-page/add-schedule-page"))

// const _ = lazy(() => import(_))

export const Page = {
  AllPosts,
  SubsPage,
  TipsPage,
  HomePage,
  LoginPage,
  UsersPage,
  StorePage,
  AddPostPage,
  AddTipsPage,
  PartnersPage,
  SelectPostType,
  AddSchedulePage,
  AddPartnersPage,
  SchedulePostsPage,
  ClassifiedPostsPage,
}
