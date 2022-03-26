import { lazy } from 'react'
import { layoutsTypes } from './layouts'

//breaking up routes by "area" or feature will make it easier to manage this file
const adminDash = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/admin/dashboard'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('../pages/AdminDash')),
  },
]

const blogs = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/blogs', 'User'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/blogfile/Blog')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/blogs/:id', 'User'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/blogfile/ReadBlog')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/create'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/blogfile/CreateBlog')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/blogs/edit'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen anyone logged in
    isAnonymous: false,
    component: lazy(() => import('@components/blogfile/EditBlog')),
  },
]

const errorRoutes = [
  {
    layout: layoutsTypes.MINIMAL,
    path: ['/errors/404'],
    exact: true,
    roles: [], //the roles that this route can be seen anyone logged in
    isAnonymous: false,
    component: lazy(() => import('../pages/PageError404')),
  },
]

const faqs = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/faq/create'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/forms/FaqForm')),
  },
]

const inventory = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/inventory'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/inventory/InventoryTable')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/inventory/insert'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/inventory/InventoryForm')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/inventory/insert/:id'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/inventory/InventoryForm')),
  },
]

const newsletter = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/newsletter'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import("@components/newsletter/Newsletter")),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/newsletter/register'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import("@components/newsletter/NewsletterRegister")),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/newsletter/register/:id'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import("@components/newsletter/NewsletterRegister")),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/newsletter/subscription'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() =>
      import("@components/newsletter/NewsletterSubscription")
    ),
  },
];

const newsletterTemplate = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/newsletterTemplate'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() =>
      import("@components/newsletterTemplate/NewsletterTemplate")
    ),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/newsletterTemplate/register'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() =>
      import("@components/newsletterTemplate/NewsletterTemplateRegister")
    ),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/newsletterTemplate/register/:id'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() =>
      import("@components/newsletterTemplate/NewsletterTemplateRegister")
    ),
  },
];

const messaging = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/inbox'],
    exact: false,
    roles: ['Admin'],
    isAnonymous: false,
    component: lazy(() => import('@components/messages/Inbox')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ["/message"],
    exact: false,
    roles: ['Admin', 'User'],
    isAnonymous: false,
    component: lazy(() => import('@components/messages/MessageThread')),
  },
]

const orders = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/shoppingcart'],
    exact: true,
    roles: ['Admin', 'User', 'Blogger'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/orders/ShoppingCart')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/orders/:id'],
    exact: true,
    roles: ["Admin"], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/orders/OrderConfirmation')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/orders'],
    exact: true,
    roles: ['Admin', 'User', 'Blogger'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@pages/Orders')),
  },
]

const orderHistory = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/userProfile/orders'],
    exact: false,
    roles: ['User'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@pages/OrderHistoryDash')),
  },
]

const product = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/product/edit'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/products/ProductForm')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/product'],
    exact: true,
    roles: ['Admin'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@pages/Product')),
  },
]
const routes = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/forms'],
    exact: true,
    roles: ['Admin', 'User', 'Blogger'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('../pages/FormsControls')),
  },
  {
    layout: layoutsTypes.NOSIDEBAR,
    path: ['/forms/nosidebar'],
    exact: true,
    roles: ['Admin', 'Blogger'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('../pages/FormsControls')),
  },
]

const userProfile = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/user/profile'],
    exact: true,
    roles: ['Admin', 'User'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@pages/UserProfile')),
  },

  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/usersettings'],
    exact: true,
    roles: ['User'], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('../pages/UserSettings')),
  },
]

const userProfiles = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/userprofiles'],
    exact: true,
    roles: [], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import("@components/userProfile/UserProfiles")),
  },
]
const advertisements = [
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/advertisements'],
    exact: true,
    roles: ["Admin", "User"], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() => import('@components/advertisements/Advertisements')),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/advertisements/create'],
    exact: true,
    roles: ["Admin"], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() =>
      import('@components/advertisements/AddAdvertisement'),
    ),
  },
  {
    layout: layoutsTypes.SIDEBAR,
    path: ['/advertisements/:id'],
    exact: true,
    roles: ["Admin"], //the roles that this route can be seen by
    isAnonymous: false,
    component: lazy(() =>
      import('@components/advertisements/AddAdvertisement'),
    ),
  },
]

export default [
  ...adminDash,
  ...blogs,
  ...errorRoutes,
  ...faqs,
  ...inventory,
  ...newsletter,
  ...newsletterTemplate,
  ...messaging,
  ...product,
  ...routes,
  ...orders,
  ...orderHistory,
  ...userProfile,
  ...userProfiles,
  ...advertisements,
];
