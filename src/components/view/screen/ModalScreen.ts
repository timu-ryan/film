import { Screen } from '@/components/base/Screen';
import { cloneTemplate } from '@/utils/html';
import { SETTINGS } from '@/utils/constants';
import { ElementCreator } from '@/types/html';

import { ModalView } from '@/components/view/common/Modal';
import { ButtonView } from '@/components/view/common/Button';
import { IView } from '@/types/components/base/View';
import { ModalScreenSettings } from '@/types/components/view/screen/ModalScreen';

/**
 * Общая логика и структура модальных окон
 */
export abstract class ModalScreen<
	H, // данные для заголовка
	M, // внутренние данные для контента модального окна
	C, // внешние данные для экрана
	S extends ModalScreenSettings // настройки экрана (обработчики событий
> extends Screen<C, S> {
	// модальное окно
	protected declare modal: ModalView<H, M>;
	// кнопка "Далее"
	protected declare nextButton: HTMLButtonElement;

	// Абстрактные методы для реализации в дочерних классах

	abstract initHeader(): IView<H>;

	abstract initContent(): IView<M>;

	// Переопределенный init() для инициализации модального окна
	protected init() {
		this.nextButton = this.getNextButton(
			SETTINGS.basketModal,
			this.settings.onNext
		);

		this.modal = this.getModalView(
			{
				headerView: this.initHeader(),
				contentView: this.initContent(),
			},
			this.settings.onClose
		);

		this.element = this.modal.element;
	}

	// Вспомогательные методы

	protected getNextButton(
		settings: { nextLabel: string; nextSettings: ElementCreator },
		onClick: () => void
	) {
		return ButtonView.make<HTMLButtonElement>(
			settings.nextLabel,
			settings.nextSettings,
			onClick
		);
	}

	protected getModalView(
		settings: { headerView: IView<H>; contentView: IView<M> },
		onClose: () => void
	) {
		return new ModalView<H, M>(cloneTemplate(SETTINGS.modalTemplate), {
			...SETTINGS.modalSettings,
			...settings,
			actions: [this.nextButton],
			onClose,
		});
	}

	// Методы установки данных

	set header(value: H) {
		this.modal.header = value;
	}

	set content(value: M) {
		this.modal.content = value;
	}

	set isActive(value: boolean) {
		this.modal.isActive = value;
	}

	set message(value: string) {
		this.modal.message = value;
	}

	set isError(value: boolean) {
		this.modal.isError = value;
	}

	set isDisabled(state: boolean) {
		this.nextButton.disabled = state;
	}
}
