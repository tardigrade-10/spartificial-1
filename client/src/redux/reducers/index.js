import {combineReducers} from 'redux'

import {users} from './user'
import {blogs} from './blog'
import {teams} from './teams'
import {involved} from './involved'
import {projects} from './project'
import {instructor} from './instructor'
import {payment} from './paymentlist'
import {files} from './files'

export const reducers=combineReducers({users,blogs,teams,involved,projects,instructor,payment,files})