import { EventEmitter } from '@/components/base/EventEmitter';
import { IFilmAPI } from '@/types/components/model/FilmApi';
import {
	AppState,
	AppStateChanges,
	AppStateConstructor,
	AppStateModals,
	AppStateSettings,
} from '@/types/components/model/AppState';

export class AppStateEmitter extends EventEmitter {
	public model: AppState;
	protected previousModal: AppStateModals = AppStateModals.none;

	constructor(
		api: IFilmAPI,
		settings: Omit<AppStateSettings, 'onChange'>,
		Model: AppStateConstructor
	) {
		super();

		this.model = new Model(api, {
			...settings,
			onChange: this.onModelChange.bind(this),
		});
	}

	protected onModelChange(changed: AppStateChanges) {
		if (changed === AppStateChanges.modal) {
			this.emit(changed, {
				previous: this.previousModal,
				current: this.model.openedModal,
			});
			this.emit(this.model.openedModal, {});
		} else {
			this.emit(changed, {});
		}
		this.previousModal = this.model.openedModal;
	}
}
