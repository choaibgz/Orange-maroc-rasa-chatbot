from __future__ import annotations

import random
from datetime import datetime
from typing import Any, Dict, List, Text

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


class ActionCreateTicket(Action):
    def name(self) -> Text:
        return "action_create_ticket"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        ticket_id = f"OM-{datetime.now().strftime('%y%m%d')}-{random.randint(1000, 9999)}"
        dispatcher.utter_message(
            text=(
                f"Votre reclamation a ete enregistree sous la reference {ticket_id}. "
                "Un conseiller Orange Maroc vous recontactera apres analyse de la demande."
            )
        )
        return []
