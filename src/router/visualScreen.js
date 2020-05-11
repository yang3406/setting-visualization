export default [{
  path: '/visualScreen/content',
  component: () => import('../views/visualScreen/content/index')
},
{
  path: '/visualScreen/content/edit',
  component: () => import('../views/visualScreen/content/editor/index')
}
]
