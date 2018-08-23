import * as React from 'react'
import {
  CREATE_ORGANIZATION_PROJECT
} from '../../App/constants'
import {IOrganization} from '../../Organizations/Organization'
import {IProject} from '../../Projects'

interface IComponentPermissionProps {
  size?: string
  type?: string
  icon?: string
  onClick?: any
  className?: string
  permission?: IOrganization
}

export default (project?: IProject, type?: string) => (WrapperComponent) => {
  class ShareDownloadPermission extends React.PureComponent<IComponentPermissionProps, {}> {
    private getPermissionByCurrentProject = () => {
      let permission = ''
      if (project) {
        const projectPermission = project.permission
        for (const attr in projectPermission) {
          if (`${type}Permission` === attr) {
            permission = projectPermission [attr]
            break
          }
        }
      }
      return permission
    }

    private computePermission = () => {
      const permission = this.getPermissionByCurrentProject()
      const defaultComponent = <span/>
      if (!project) {
        return defaultComponent
      }
      switch (Number(permission)) {
        case 0:
          return defaultComponent
        case 1:
          return <WrapperComponent disabled  {...this.props}>{this.props.children}</WrapperComponent>
        default:
          return defaultComponent
      }
    }

    public render () {
      const result = this.computePermission()
      return result
    }
  }
  return ShareDownloadPermission
}



