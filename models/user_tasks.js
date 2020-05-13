const { Model } = require('objection')

class Task extends Model {
    static get tableName() {
        return 'user_tasks'
    }

    static get relationMappings() {
        const User = require('./user')
        return {
            user: {
                modelClass: User,
                relation: Model.BelongsToOneRelation,
                join: {
                    from: "user_task.user_id",
                    to: "user.id"
                }
            }
        }
    }
}


module.exports = Task;  