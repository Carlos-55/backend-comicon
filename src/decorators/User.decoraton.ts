import { createParamDecorator, ExecutionContext, Request } from '@nestjs/common';

export const UserRequest = createParamDecorator(
	(data: string, ctx: any /* Request */) => {
		const request = ctx;
		const user = request.user;
		return data ? user && user[data] : user;
	},
);
