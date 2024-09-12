export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface Movie {
	id: string;
	rating: number;
	director: string;
	tags: string[];
	title: string;
	about: string;
	description: string;
	image: string;
	cover: string;
}

export interface Session {
	id: string;
	film: string;
	daytime: string;
	day: string;
	time: string;
	hall: string;
	rows: number;
	seats: number;
	price: number;
	taken: string[];
}

export interface Ticket {
	film: string;
	session: string;
	daytime: string;
	day: string;
	time: string;
	row: number;
	seat: number;
	price: number;
}

export interface Contacts {
	email: string;
	phone: string;
}

export interface Order extends Contacts {
	tickets: Ticket[];
}

export interface OrderResult extends Ticket {
	id: string;
}

export interface IFilmAPI {
	getFilms: () => Promise<Movie[]>;
	getFilmSchedule: (id: string) => Promise<Session[]>;
	orderTickets: (order: Order) => Promise<OrderResult[]>;
}
