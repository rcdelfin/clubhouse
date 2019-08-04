# frozen_string_literal: true
# == Schema Information
#
# Table name: relays
#
#  id                 :bigint(8)        not null, primary key
#  inbox_url          :string           default(""), not null
#  follow_activity_id :string
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  state              :integer          default("idle"), not null
#

class Relay < ApplicationRecord
end
