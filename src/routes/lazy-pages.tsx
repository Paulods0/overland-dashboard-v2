import { lazy } from "react"

const HomePage = lazy(() => import("../pages/home-page"))
const TipsPage = lazy(() => import("../pages/tips-page"))
const SubsPage = lazy(() => import("../pages/subs-page"))
const UsersPage = lazy(() => import("../pages/users-page"))
const StorePage = lazy(() => import("../pages/store-page"))
const LoginPage = lazy(() => import("../pages//login-page"))
const EditTipPage = lazy(() => import("../pages/edit-tip-page"))
const PartnersPage = lazy(() => import("../pages/partners-page"))
const EditPostPage = lazy(() => import("../pages/edit-post-page"))
const EditPartnerPage = lazy(() => import("../pages/edit-partner-page"))
const AllPosts = lazy(() => import("../pages/all-posts-page/all-posts"))
const SchedulePostsPage = lazy(() => import("../pages/schedule-post-page"))
const AddPostPage = lazy(() => import("../pages/add-post-page/add-post-page"))
const AddTipsPage = lazy(() => import("../pages/add-post-page/add-tips-page"))
const ClassifiedPostsPage = lazy(() => import("../pages/classified-posts-page"))
const SelectPostType = lazy(
  () => import("../pages/add-post-page/select-post-type")
)
const AddPartnersPage = lazy(
  () => import("../pages/add-post-page/add-partners-page")
)
const AddSchedulePage = lazy(
  () => import("../pages/add-post-page/add-schedule-page")
)

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
  EditTipPage,
  EditPostPage,
  PartnersPage,
  SelectPostType,
  AddSchedulePage,
  AddPartnersPage,
  EditPartnerPage,
  SchedulePostsPage,
  ClassifiedPostsPage,
}
